import { Component } from "react";
import AutoComplete from "./components/AutoComplete";
import InputSelection from "./components/InputSelection";
import InputText from "./components/InputText";
import dataNPSN from './data-npsn.json';

export default class FormStep1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "nama-siswa": undefined,
      "domisili-siswa": undefined,
      "nisn-siswa": undefined,
      "npsn-sekolah": undefined,
      "nama-sekolah": undefined,
      "jurusan-siswa": undefined,
      // 'jurusan-siswa-lalu':undefined,
      isValid:false,
    }
    
    if (props['values'])
      this.state = props.values;

    this.handleChange = props.handleChange;
    this.next = props.nextStep;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.validasiNPSN = this.validasiNPSN.bind(this);
  }

  handleSubmit = (event) => {
    if (this.state.isValid){
      this.next();
    } else {
      alert('Isi form dengan tepat!');
    }
    event.preventDefault();
  }

  handleInputChange = (name,value) => {
    this.handleChange(name)(value);

    const nextState = {[name]:value};

    switch (name){
      case 'npsn-sekolah':
        const {isValid} = this.validasiNPSN(value);
        if (isValid){
          const data = dataNPSN.find(item => item.npsn === value);
          if (data){
            nextState['nama-sekolah'] = data.nama;
          }
        }
        break;
      case 'jurusan-siswa':
        if (this.state['jurusan-siswa'] != value){
          // nextState['jurusan-siswa-lalu'] = value;
        }
        break;
    }

    // console.log(nextState);

    nextState['isValid'] = this.isValid(nextState);

    this.setState(nextState);

  }
  isValid = (state) => {
    const nama = this.validasiNama(state['nama-siswa']||this.state['nama-siswa']||"");
    const alamat = this.validasiDomisili(state['domisili-siswa']||this.state['domisili-siswa']||"");
    const nisn = this.validasiNISN(state['nisn-siswa']||this.state['nisn-siswa']||"");
    const npsn = this.validasiNPSN(state['npsn-sekolah']||this.state['npsn-sekolah']||"");
    const namaSekolah = this.validasiNamaSekolah(state['nama-sekolah']||this.state['nama-sekolah']||"");
    const jurusan = this.validasiJurusan(state['jurusan-siswa']||this.state['jurusan-siswa']||"");

    return (
      nama.isValid &&
      alamat.isValid &&
      nisn.isValid &&
      npsn.isValid &&
      namaSekolah.isValid &&
      jurusan.isValid
    )
  }


  render() {
    // $.apply()
    // console.log(this.state);
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="d-block text-start mx-lg-4 mb-5 shadow-lg bg-light border-start border-end border-dark border-5 p-4">
          <InputText
            className="mb-3"
            name="nama-siswa"
            label="Nama Siswa"
            hint="Masukkan nama siswa"
            handleValueChange={this.handleInputChange}
            value={this.state['nama-siswa']}
            required={true}
            validation={this.validasiNama}
            autoFocus={true}
          />
          <InputText
            className="mb-3"
            name="domisili-siswa"
            label="Domisili Siswa"
            hint="Masukkan alamat domisili siswa"
            handleValueChange={this.handleInputChange}
            value={this.state['domisili-siswa']}
            required={true}
            validation={this.validasiDomisili}
          />
          <InputText
            className="mb-3"
            name="nisn-siswa"
            label="NISN Siswa"
            hint="Masukkan NISN siswa"
            maxLength="10"
            handleValueChange={this.handleInputChange}
            value={this.state['nisn-siswa']}
            required={true}
            validation={this.validasiNISN}
          />
          <div className="row mb-3">
            <AutoComplete
              className="col"
              name="npsn-sekolah"
              label="NPSN Sekolah"
              hint="Masukkan NPSN Sekolah"
              maxLength="8"
              handleValueChange={this.handleInputChange}
              value={this.state['npsn-sekolah']}
              required={true}
              validation={this.validasiNPSN}
              data={dataNPSN}
              itemKeyNames={{value:"npsn",label:"nama"}}
              // onSelect={this.onSelectNPSN}
            />
            <InputText
              className="col"
              name="nama-sekolah"
              label="Nama Sekolah"
              hint="Masukkan nama sekolah"
              handleValueChange={this.handleInputChange}
              value={this.state['nama-sekolah']}
              required={true}
              validation={this.validasiNamaSekolah}
            />
          </div>
          <InputSelection
            name="jurusan-siswa"
            label="Jurusan Siswa"
            hint="Pilih salah satu"
            options={[
              {
                value: "ipa",
                label:"IPA",
                selected:false,
              },
              {
                value: "ips",
                label:"IPS",
                selected:false,
              },
              {
                value: "bahasa",
                label:"Bahasa",
                selected:false,
              },
              {
                value: "smk",
                label:"SMK",
                selected:false,
              }
            ]}
            handleValueChange={this.handleInputChange}
            lastVal={this.state['jurusan-siswa-lalu']}
            value={this.state['jurusan-siswa']}
            required={true}
            validation={this.validasiJurusan}
          />
        </div>
        <div className="d-flex mx-lg-4 mb-4 justify-content-end">
          <this.Buttons/>
        </div>
      </form>
    )
  }
  Buttons = () => {
    if (this.state.isValid) {
      return (
        <button type="submit" className="btn btn-dark">
          Selanjutnya
          <i className="bi bi-caret-right-fill ms-2"></i>
        </button>
      )
    } else {
      return (
        <button type="button" className="btn btn-outline-dark disabled" disabled={true} title="Isi form dengan tepat untuk melanjutkan!">
          Selanjutnya
          <i className="bi bi-caret-right-fill ms-2"></i>
        </button>
      )
    }
  }

  validasiNama = (val) => {
    if (val === undefined) return {}
    const isValid = val.length > 2;

    const messages = [];
    if (isValid){
      messages.push(...[
        (<span className="valid">Nama sudah valid</span>)
      ]);
    } else {
      if (val.length === 0) {
        messages.push(
          (<span className="invalid">Nama tidak boleh kosong!</span>)
        );
      } else
        messages.push(...[
          (<span className="invalid">Nama harus lebih dari 2 karakter!</span>),
        ]);
    }
    return {isValid:isValid, messages:messages};
  }
  validasiDomisili = (val) => {
    if (val === undefined) return {}
    const isValid = val.length > 2;

    const messages = [];
    if (isValid){
      messages.push(...[
        (<span className="valid">Alamat sudah valid</span>)
      ]);
    } else {
      if (val.length === 0) {
        messages.push(
          (<span className="invalid">Alamat tidak boleh kosong!</span>)
        );
      } else
        messages.push(...[
          (<span className="invalid">Input harus lebih dari 2 karakter!</span>),
        ]);
    }
    return {isValid:isValid, messages:messages};
  }
  validasiNISN = (val) => {
    if (val === undefined) return {}
    const isValid = val.length === 10;

    const messages = [];
    if (isValid){
      messages.push(...[
        (<span className="valid">Jumlah karakter NISN sudah tepat</span>)
      ]);
    } else {
      if (val.length === 0) {
        messages.push(
          (<span className="invalid">NISN tidak boleh kosong!</span>)
        );
      } else {
        let msg = "NISN harus ada 10 karakter, ";
        if (val.length < 10)
          msg += "kamu sekarang hanya mengisi "+val.length+" karakter!";
        else
          msg += "kamu sekarang sudah mengisi "+val.length+" karakter!";

        messages.push(...[
          (<span className="invalid">{msg}</span>),
        ]);
      }
    }
    return {isValid:isValid, messages:messages};
  }
  validasiNPSN = (val) => {
    if (val === undefined) return {}
    let isValid = val.length === 8;

    const messages = [];
    if (isValid){
      messages.push(...[
        (<span className="valid">Jumlah karakter NISN sudah tepat</span>)
      ]);
    } else {
      if (val.length === 0) {
        messages.push(
          (<span className="invalid">NISN tidak boleh kosong!</span>)
        );
      } else {
        let msg = "NISN harus ada 10 karakter, ";
        if (val.length < 10)
          msg += "kamu sekarang hanya mengisi "+val.length+" karakter!";
        else
          msg += "kamu sekarang sudah mengisi "+val.length+" karakter!";

        messages.push(...[
          (<span className="invalid">{msg}</span>),
        ]);
      }
    }
    return {isValid:isValid, messages:messages};
  }
  validasiNamaSekolah = (val) => {
    if (val === undefined) return {}
    let isValid = val.length > 2;

    const messages = [];
    if (isValid){
      messages.push(...[
        (<span className="valid">Nama Sekolah sudah valid</span>)
      ]);
    } else {
      if (val.length === 0) {
        messages.push(
          (<span className="invalid">Nama Sekolah tidak boleh kosong!</span>)
        );
      } else {
        let msg = "Nama Sekolah harus lebih dari 2 karakter!";
        messages.push(...[
          (<span className="invalid">{msg}</span>),
        ]);
      }
    }
    return {isValid:isValid, messages:messages};
  }
  validasiJurusan = (val) => {
    if (val === undefined) return {}
    const isValid = val.length > 0;

    const messages = [];
    if (isValid){
      messages.push(<span className="valid">Pilihan sudah valid</span>);
    } else {
      messages.push(<span className="invalid">Pilihan tidak boleh kosong!</span>)
    }

    return {isValid:isValid, messages:messages};
  }
  
}