import { render } from "@testing-library/react";
import { Component } from "react";
import InputSelection from "./components/InputSelection";
import InputText from "./components/InputText";

export default class FormStep1 extends Component {

  state = {
    "nama-siswa": undefined,
    "domisili-siswa": undefined,
    "nisn-siswa": undefined,
    "npsn-sekolah": undefined,
    "nama-sekolah": undefined,
    "jurusan-siswa": undefined,
  }

  constructor(props) {
    super(props);
    
    if (props['values'])
      this.state = props.values;

    this.handleChange = props.handleChange;
    this.next = (event) => {
      event.preventDefault();
      props.nextStep();
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (event) => {

    event.preventDefault();
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="d-block text-start mx-lg-4 mb-5 shadow-lg bg-light border-start border-end border-dark border-5 p-4">
          <InputText
            className="mb-3"
            name="nama-siswa"
            label="Nama Siswa"
            hint="Masukkan nama siswa"
            handleValueChange={this.handleChange}
            value={this.state['nama-siswa']}
          />
          <InputText
            className="mb-3"
            name="domisili-siswa"
            label="Domisili Siswa"
            hint="Masukkan alamat domisili siswa"
            handleValueChange={this.handleChange}
            value={this.state['domisili-siswa']}
          />
          <InputText
            className="mb-3"
            name="nisn-siswa"
            label="NISN Siswa"
            hint="Masukkan NISN siswa"
            handleValueChange={this.handleChange}
            value={this.state['nisn-siswa']}
          />
          <div className="row mb-3">
            <InputText
              className="col"
              name="npsn-sekolah"
              label="NPSN Sekolah"
              hint="Masukkan NPSN Sekolah"
              handleValueChange={this.handleChange}
              value={this.state['npsn-sekolah']}
            />
            <InputText
              className="col"
              name="nama-sekolah"
              label="Nama Sekolah"
              hint="Masukkan nama sekolah"
              handleValueChange={this.handleChange}
              value={this.state['nama-sekolah']}
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
          />
        </div>
        <div className="d-flex mx-lg-4 mb-4 justify-content-end">
          <button type="button" className="btn btn-outline-dark" onClick={this.next}>
            Selanjutnya
            <i className="bi bi-caret-right-fill ms-2"></i>
          </button>
        </div>
      </form>
    )
  }
}