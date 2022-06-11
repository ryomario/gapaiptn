import { Component } from "react";
import InputPTN from "./components/InputPTN";

export default class FormStep3 extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }

    if (props['values'] !== undefined) {
      this.state = props['values'];
      // console.log("form 2",this.state);
      this.state['isValid'] = this.isValid(this.state);
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit = (event) => {
    // console.log('submit',this.state.isValid);
    if (this.state.isValid){
      this.props['nextStep']?.();
    } else {
      alert('Isi form dengan tepat!');
    }

    event.preventDefault();
  }

  handleInputChange = (name,value) => {
    this.props['handleChange']?.(name)(value);

    const nextState = {[name]:value};

    // console.log('change');

    nextState['isValid'] = this.isValid(nextState);

    this.setState(nextState);
  }

  isValid = (state) => {
    return (this.validasiPilihan(state['pilihan-1']||this.state['pilihan-1']) && this.validasiPilihan(state['pilihan-2']||this.state['pilihan-2']))
  }

  validasiPilihan = (pilihan) => {
    return (pilihan?.['ptn'] !== undefined) && (pilihan?.['prodi'] !== undefined)
  }


  render(){
    return (
      <form className="container-fluid" onSubmit={this.handleSubmit}>
        <div className="d-block text-start mx-lg-4 mb-5 shadow-lg bg-light border-start border-start border-end border-dark border-5 p-4">
          <h3 className="text-capitalize">Pilih target rasionalisasi</h3>
          <div className="mb-3">
            <InputPTN
              className="mb-3"
              name="pilihan-1"
              autoFocus={true}
              onChange={this.handleInputChange}
              value={this.state['pilihan-1']}
            />
            <InputPTN
              name="pilihan-2"
              onChange={this.handleInputChange}
              value={this.state['pilihan-2']}
            />
          </div>
        </div>
        <div className="d-flex mx-lg-4 mb-4 justify-content-between">
          <button type="button" className="btn btn-danger" onClick={()=>this.props['prevStep']?.()}>
            <i className="bi bi-caret-left-fill me-2"></i>
            Sebelumnya
          </button>
          <this.Buttons/>
        </div>
      </form>
    )
  }

  Buttons = () => {
    if (this.state.isValid) {
      return (
        <button type="submit" className="btn btn-dark">
          Rasionalisasi
          <i className="bi bi-caret-right-fill ms-2"></i>
        </button>
      )
    } else {
      return (
        <button type="button" className="btn btn-outline-dark disabled" disabled={true} title="Isi form dengan tepat untuk melanjutkan!">
          Rasionalisasi
          <i className="bi bi-caret-right-fill ms-2"></i>
        </button>
      )
    }
  }
}