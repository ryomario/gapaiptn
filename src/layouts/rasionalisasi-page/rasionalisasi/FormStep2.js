import { Component } from "react";
import InputNilaiSemester from "./components/InputNilaiSemester";
import schemaInputNilai from './data/input-nilai-schema.json';

export default class FormStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // semua undefined
    }
    this.validation = {
      // semua undefined
    }
    if (props['values'] !== undefined) {
      this.state = props['values'];
      this.state['isValid'] = this.isValid(this.state);
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validasiNilai = this.validasiNilai.bind(this);
  }

  handleSubmit = (event) => {
    if (this.state.isValid){
      this.props['nextStep']?.();
    } else {
      alert('Isi form dengan tepat!');
    }

    event.preventDefault();
  }
  handleInputChange = (name, value, label) => {
    this.props['handleChange']?.(name)(value);

    const nextState = {[name]:value};

    // validasi
    this.validation[name] = this.validasiNilai(value,label)['isValid'];
    // console.log(nextState);

    nextState['isValid'] = this.isValid(nextState);

    this.setState(nextState);

  }

  isValid = (state) => {
    for (const s of this.semesters) {
      for (const g of this.inputSemester()) {
        for (const input of g) {
          const name = this.inputNilai_nameGenerator(input['name'],s['name']);
          if (!this.validation[name]) return false;
        }
      }
    }
  }

  validasiNilai = (value,label) => {
    // console.log(label,value);
    if (value === undefined){
      return {}
    }
    if (value === ""){
      return {isValid:false,messages:[(<span className="invalid">Nilai {label} tidak boleh kosong!</span>)]}
    }
    if (isNaN(value)){
      return {isValid:false,messages:[(<span className="invalid">Nilai {label} harus berupa angka!</span>)]}
    }
    if (value < 0 || value > 100) {
      return {isValid:false,messages:[(<span className="invalid">Nilai {label} tidak berada di interval 0 - 100!</span>)]}
    }
    
    return {
      isValid:true,
      messages:[
        (<span className="valid">Nilai sudah valid</span>)
      ]
    }

  }
  semesters = [
    {
      idx:1,
      name:"s1"
    },
    {
      idx:2,
      name:"s2"
    },
    {
      idx:3,
      name:"s3"
    },
    {
      idx:4,
      name:"s4"
    },
    {
      idx:5,
      name:"s5"
    }
  ]
  inputSemester = () => [
    schemaInputNilai['wajib'],
    schemaInputNilai[this.state['jurusan-siswa']]
  ]
  inputNilai_nameGenerator = (semesterName,inputName) => inputName+'-'+semesterName;

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="d-block text-start mx-lg-4 mb-5 shadow-lg bg-light border-start border-end border-dark border-5 p-4">
          {
            this.semesters.map(semester => (
              <InputNilaiSemester 
                key={semester.idx}
                className="mb-2"
                name={semester.name} 
                nameGenerator={this.inputNilai_nameGenerator}
                label={"Semester "+semester.idx}
                handleChange={this.handleInputChange}
                validation={this.validasiNilai}
                values={this.state}
                inputGroups={this.inputSemester()}/>
            ))
          }
          <h3 className="text-uppercase">Prestasi</h3>
        </div>
      </form>
    )
  }
}