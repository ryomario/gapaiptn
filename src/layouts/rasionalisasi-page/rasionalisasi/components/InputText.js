import { Component } from "react";

export default class InputText extends Component {
  constructor(props){
    super(props);
    this.className = props.className;
    this.state = {
      value: ""
    }
    this.name = props.name;
    this.label = props.label;

    if (props['handleValueChange']){
      this.handleValueChange = props.handleValueChange;
    }
    if (props['hint']){
      this.hint = props.hint;
    }
    if (props['value']){
      this.state.value = props.value;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    
    // Listen changed value
    const changeListener = this.handleValueChange?.(event.target.name);
    changeListener?.(event);
    // Refresh UI
    this.setState({value:event.target.value});
  }

  render() {
    return (
      <fieldset className={this.className}>
        <label htmlFor={this.name} className="form-label">{this.label}</label>
        <input 
          type="text" 
          className="form-control" 
          id={this.name} 
          name={this.name}
          placeholder={this.hint}
          onChange={this.handleChange} 
          value={this.state['value'] ? this.state.value:""}
        />
      </fieldset>
    )
  }
}