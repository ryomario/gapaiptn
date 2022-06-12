import { Component } from "react";

import dataJurusan from "./data/jurusan.json";
import dataPtn from "./data/ptn.json";
import dataProdi from "./data/prodi.json";

import dataNpsn from "./data/npsn.json";

const getSekolahByNpsn = (npsn) => {
  return dataNpsn.find(d => d.npsn == npsn);
}


export const getJurusanByValue = (value) => {
  return dataJurusan.find(jurusan => jurusan.value == value);
}

export const getPtnByNpsn = (npsn) => {
  return dataPtn.find(ptn => ptn.npsn == npsn);
}

export const getProdiByKode = (npsn,kode) => {
  return dataProdi[npsn].find(prodi => prodi.kode == kode);
}


export const hitungRataRata = (values) => {
  const count = values.length;
  const sum = values.reduce(((jml,val) => jml + val),0);

  return sum / count;
}

export const getNilaiSemester = (namaSemester,data) => {
  const names = Object.keys(data).filter(name => name.startsWith(namaSemester));

  const nilai = names.map(name => {
    const namaMapel = name.split('-')?.[1];

    const nilaiMapel = Number(data[name]);

    return {
      'name':namaMapel,
      'nilai':nilaiMapel
    }
  });

  return nilai;
}

export const getNilaiMapel = (namaMapel,data) => {
  const nilaiSemesters = ['s1','s2','s3','s4','s5'].map((nama) => {
    const nilai = getNilaiSemester(nama,data).find(ns => ns.name == namaMapel);
    return {
      ...nilai,
      'nama-semester':nama
    }
  });
  // console.log('nilai semester '+namaMapel,nilaiSemesters);

  return nilaiSemesters.map(nilaiSemester => {
    return {
      'name':nilaiSemester['nama-semester'],
      'nilai':nilaiSemester['nilai']
    }
  });
}

export const getRataRataMapel = (namaMapel,data) => {
  const nilaiMapel = getNilaiMapel(namaMapel,data);

  // console.log('nilaiMapel '+namaMapel,nilaiMapel);

  return hitungRataRata(nilaiMapel.map(mapel => mapel['nilai']));
}

export const getNilaiRataRata = (listNamaMapel,data) => {
  return hitungRataRata(listNamaMapel.map(nama => getRataRataMapel(nama,data)));
}


const getRequestData = (values) => {
  const req = {};
  for (const nama of ['ind','ing','mtk','kim','fsk','bio']) {
    req[nama] = getRataRataMapel(nama,values);
  }

  const sertifikat = values['prestasi'];
  let nilaiSert = 0;
  if (sertifikat) {
    const namaSert = Object.keys(sertifikat);
    for (const nama of namaSert) {
      const level = sertifikat[nama]?.['level'];
      const nilai = Number(level) * 10;
      nilaiSert += nilai;
    }
  }

  req['sertifikat'] = nilaiSert;

  const sekolah = getSekolahByNpsn(values['npsn-sekolah']);

  let nilaiAkreditasi;
  switch (sekolah?.['akreditasi']?.toUpperCase()) {
    case 'A':
      nilaiAkreditasi = 30;
      break;
    case 'B':
      nilaiAkreditasi = 20;
      break;
    case 'C':
      nilaiAkreditasi = 10;
      break;
    default:
      nilaiAkreditasi = 0;
  }

  req['akreditasi'] = nilaiAkreditasi;


  const ptn_pilihan_1 = getPtnByNpsn(values['pilihan-1']?.['ptn']);
  const ptn_pilihan_2 = getPtnByNpsn(values['pilihan-2']?.['ptn']);
  const prodi_pilihan_1 = getPtnByNpsn(values['pilihan-1']?.['prodi']);
  const prodi_pilihan_2 = getPtnByNpsn(values['pilihan-2']?.['prodi']);

  req['pilihan-1'] = values['pilihan-1'];
  req['pilihan-2'] = values['pilihan-2'];


  // console.log(req);

  return req;
}

export default class StepHasil extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    
    if (props['values'] !== undefined) {
      this.state = props['values'];
      // this.state['isValid'] = this.isValid(this.state);

      
    }

  }
  componentDidMount() {
    const req = getRequestData(this.state);

      // console.log('req')

      if (req) {
        const reqOptions = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(req)
        };

        fetch('http://localhost:5000/rasionalisasi',reqOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({'hasil':data});
        });
      }
  }
  componentDidUpdate(prevProps,prevState) {
    if (this.props['values']?.['hasil']){
      if (this.props['values']?.['hasil'] !== prevState['hasil']){
        this.setState(this.props['value']);
      }
    }
  }



  rataRataNilaiRapor = () => {
    const rataRata = getNilaiRataRata(['mtk','ing','ind','kim','fsk','bio'],this.state)
    // console.log(rataRata);
    return rataRata;
  }
  listPrestasi = () => {
    if (this.state['prestasi'] === undefined) return [];

    const pNames = Object.keys(this.state['prestasi']);

    return pNames.map(name => this.state['prestasi'][name]);
  }
  getPtn = (namaPilihan) => {
    const npsn = this.state[namaPilihan]?.['ptn'];

    return getPtnByNpsn(npsn);
  }
  getProdi = (namaPilihan) => {
    const npsn = this.state[namaPilihan]?.['ptn'];
    const kode = this.state[namaPilihan]?.['prodi'];

    return getProdiByKode(npsn,kode);
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="d-block text-start mx-lg-4 mb-5 shadow-lg bg-light border-start border-end border-dark border-5 p-4">
          <h3 className="text-capitalize">{this.state['nama-siswa']}</h3>
          <div className="mb-4">
            <div>{this.state['nama-sekolah'] + ", " + getJurusanByValue(this.state['jurusan-siswa']).label}</div>
            <div>Nilai rata-rata raport <b>{this.rataRataNilaiRapor().toFixed(2)}</b></div>
            <div><b>{this.listPrestasi().length}</b> prestasi disertakan</div>
          </div>
        </div>
        <h2 className="mb-4 fw-bold">Hasil Rasionalisasi</h2>
        <div className="d-block text-start mx-lg-4 mb-5">
          <div className="accordion shadow-lg" id="hasil-rasionalisasi">
            <this.Hasil num={1}/>
            <this.Hasil num={2}/>
          </div>
        </div>
      </div>
    );
  }

  Hasil = ({num}) => {
    if (this.state['hasil']) {
      return (
        <div className="accordion-item">
          <h2 className="accordion-header" id={"hasil-rasionalisasi-"+num+"-heading"}>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#hasil-rasionalisasi-"+num+"-collapse"} aria-expanded="true" aria-controls={"hasil-rasionalisasi-"+num+"-collapse"}>Hasil Rasionalisasi {num}</button>
          </h2>
          <div id={"hasil-rasionalisasi-"+num+"-collapse"} className="accordion-collapse collapse show" aria-labelledby={"hasil-rasionalisasi-"+num+"-heading"} data-bs-parent="#hasil-rasionalisasi">
            <div className="accordion-body">
              <h5>{this.getPtn('pilihan-'+num)?.['singkatan'] + " - " + this.getProdi('pilihan-'+num)?.['nama']}</h5>
              <p>Prodi ini diminati oleh beberapa siswa dari beberapa daerah.</p>
              <div className="card">
                <div className="card-header">Hasil Rasionalisasi</div>
                <div className="card-body">
                  <p>Setelah diperhitungkan dengan menggunakan model perhitungan modern, dapat di prediksi bahwa dengan nilai dan spesifikasi yang sudah anda masukkan bahwa hasil Rasionalisasi Kelulusan SNMPTN anda adalah <b>{this.state['hasil']?.['status'] == 0?'LULUS':this.state['hasil']?.['status'] !== undefined?'TIDAK LULUS':'UNKNOWN'}</b></p>
                  <div className="progress">
                    <div className="progress-bar bg-secondary" role="progressbar" style={{width: this.state['hasil']?.['prosentase-'+num]+"%"}} aria-valuenow={this.state['hasil']?.['prosentase-'+num]} aria-valuemin="0" aria-valuemax="100">{this.state['hasil']?.['prosentase-'+num]}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}