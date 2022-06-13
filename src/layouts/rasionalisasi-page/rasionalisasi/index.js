import { Component } from "react";
import axios from "axios";
import dataSiswa from './data/siswa.json';
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import StepHasil from "./StepHasil";



export default class Rasionalisasi extends Component {

  steps = {
    "data-diri":{
      iconClassName: "bi bi-file-text",
      name: "Data diri",
      isActive: true,
      prevStep: "data-diri",
      nextStep: "input-nilai",
    },
    "input-nilai":{
      iconClassName: "bi bi-award-fill",
      name: "Input nilai & prestasi",
      isActive: false,
      prevStep: "data-diri",
      nextStep: "pilih-prodi",
    },
    "pilih-prodi":{
      iconClassName: "bi bi-pin-map",
      name: "Pilih PTN & Prodi",
      isActive: false,
      prevStep: "input-nilai",
      nextStep: "hasil-rasionalisasi",
    },
    "hasil-rasionalisasi":{
      iconClassName: "bi bi-bullseye",
      name: "Hasil Rasionalisasi",
      isActive: false,
      prevStep: "pilih-prodi",
      nextStep: "hasil-rasionalisasi",
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      step: "data-diri"
    }

    fetch('/api/time')
          .then(response => {console.log(response);return response.json()})
          .then(data => {
            console.log(data);
            // this.setState({'hasil':data});
        });

    // this.values = {};
    this.values = dataSiswa;
    if (props['values']) {
      this.values = props.values;

      
    }

    
  }

  nextStep = () => {
    const { step } = this.state;
    // Sebelum setState mungkin bisa lakukan validasi data
    // Validasi data sudah di FormStep

    // console.log("step");
    const nextStep = this.steps[step].nextStep;
    this.steps[nextStep].isActive = true;
    this.setState({'step':nextStep});
  }
  prevStep = () => {
    const { step } = this.state;

    this.steps[step].isActive = false;
    const prevStep = this.steps[step].prevStep;
    this.setState({'step':prevStep});
  }
  handleChange = (name) => (value) => {
    this.values[name] = value;

    // console.log(this.values);
    // Mungkin disini bisa disimpan datanya
  }

  ProgressBar = ({steps}) => (
    <ul id="progressbar" className="text-white-50 fw-bold text-uppercase mb-4">
      {
        Object.keys(steps).map(key => {
          const step = steps[key];
          return (
            <li className={(step.isActive ? "active" : "")} key={key} id={key}>
              <div className="icon">
                <i className={(step.iconClassName)}></i>
              </div>
              {step.name}
            </li>
          )
        })
      }
    </ul>
  );
  FormStep = () => {
    switch (this.state.step) {
      case 'data-diri': return (
        <FormStep1 nextStep={this.nextStep} handleChange={this.handleChange} values={this.values}/>
      );
      case 'input-nilai': return (
        <FormStep2 prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={this.values}/>
      );
      case 'pilih-prodi': return (
        <FormStep3 prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={this.values}/>
      );
      case 'hasil-rasionalisasi': 
        // const req = getRequestData({...this.values});

        // if (req) {
        //   const reqOptions = {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(req)
        //   };

        //   fetch('http://localhost:5000/rasionalisasi',reqOptions)
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log(data);
        //       this.setState({'hasil':data});
        //     });
          
          // axios.post('http://localhost:5000/rasionalisasi',req)
          //   .then((response) => {
          //     console.log(response.data);
          //     this.setState({'hasil':response.data});
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        // }
        return (
          <StepHasil values={this.values} hasil={this.state['hasil']}/>
        );
    }
  }
  isNextStepActive = () => {
    const currStepKey = this.state.step;
    const nextStepKey = this.steps[currStepKey].nextStep;
    if (currStepKey === nextStepKey) return undefined;

    return this.steps[nextStepKey].isActive;
  }

  componentDidUpdate(){
    window.scrollTo(0, 0);
  }

  render() {
    console.log(this.values);
    return (
      <div id="rasionalisasi">
        <this.ProgressBar steps={this.steps}/>
        <this.FormStep/>
      </div>
    );
  }
}