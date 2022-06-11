import { Component } from "react";
import dataJurusan from "./data/jurusan.json";
import dataPtn from "./data/ptn.json";
import dataProdi from "./data/prodi.json";


const getJurusanByValue = (value) => {
  return dataJurusan.find(jurusan => jurusan.value == value);
}
const getPtnByNpsn = (npsn) => {
  return dataPtn.find(ptn => ptn.npsn == npsn);
}
const getProdiByKode = (npsn,kode) => {
  return dataProdi[npsn].find(prodi => prodi.kode == kode);
}

const hitungRataRata = (values) => {
  const count = values.length;
  const sum = values.reduce(((jml,val) => jml + val),0);

  return sum / count;
}
const getNilaiSemester = (namaSemester,data) => {
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
const getNilaiMapel = (namaMapel,data) => {
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
const getRataRataMapel = (namaMapel,data) => {
  const nilaiMapel = getNilaiMapel(namaMapel,data);

  // console.log('nilaiMapel '+namaMapel,nilaiMapel);

  return hitungRataRata(nilaiMapel.map(mapel => mapel['nilai']));
}
const getNilaiRataRata = (listNamaMapel,data) => {
  return hitungRataRata(listNamaMapel.map(nama => getRataRataMapel(nama,data)));
}


export default class StepHasil extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    
    if (props['values'] !== undefined) {
      this.state = props['values'];
      // this.state['isValid'] = this.isValid(this.state);

      this.state['hasilProsentase-1'] = 65;
      this.state['hasilProsentase-2'] = 73;
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
            <div className="accordion-item">
              <h2 className="accordion-header" id="hasil-rasionalisasi-1-heading">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hasil-rasionalisasi-1-collapse" aria-expanded="true" aria-controls="hasil-rasionalisasi-1-collapse">Hasil Rasionalisasi 1</button>
              </h2>
              <div id="hasil-rasionalisasi-1-collapse" className="accordion-collapse collapse show" aria-labelledby="hasil-rasionalisasi-1-heading" data-bs-parent="#hasil-rasionalisasi">
                <div className="accordion-body">
                  <h5>{this.getPtn('pilihan-1')?.['singkatan'] + " - " + this.getProdi('pilihan-1')?.['nama']}</h5>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, aspernatur?</p>
                  <div className="card">
                    <div className="card-header">Hasil Rasionalisasi</div>
                    <div className="card-body">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt vel minima eius, temporibus deserunt architecto cum modi ullam iure, atque velit dolor ipsam ex consequatur porro error non, facere aspernatur?</p>
                      <div className="progress">
                        <div className="progress-bar bg-secondary" role="progressbar" style={{width: this.state['hasilProsentase-1']+"%"}} aria-valuenow={this.state['hasilProsentase-1']} aria-valuemin="0" aria-valuemax="100">{this.state['hasilProsentase-1']}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="hasil-rasionalisasi-2-heading">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hasil-rasionalisasi-2-collapse" aria-expanded="false" aria-controls="hasil-rasionalisasi-2-collapse">Hasil Rasionalisasi 2</button>
              </h2>
              <div id="hasil-rasionalisasi-2-collapse" className="accordion-collapse collapse" aria-labelledby="hasil-rasionalisasi-2-heading" data-bs-parent="#hasil-rasionalisasi">
                <div className="accordion-body">
                  <h5>{this.getPtn('pilihan-2')?.['singkatan'] + " - " + this.getProdi('pilihan-2')?.['nama']}</h5>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, aspernatur?</p>
                  <div className="card">
                    <div className="card-header">Hasil Rasionalisasi</div>
                    <div className="card-body">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt vel minima eius, temporibus deserunt architecto cum modi ullam iure, atque velit dolor ipsam ex consequatur porro error non, facere aspernatur?</p>
                      <div className="progress">
                        <div className="progress-bar bg-secondary" role="progressbar" style={{width: this.state['hasilProsentase-2']+"%"}} aria-valuenow={this.state['hasilProsentase-2']} aria-valuemin="0" aria-valuemax="100">{this.state['hasilProsentase-2']}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}