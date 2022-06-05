import { Component } from "react";

export default class InputSelection extends Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    this.state = {
      value: ''
    }
    if (props['options']) {
      this.options = props.options;
    }
    this.name = props.name;
    this.label = props.label;
    this.hint = props.hint;


    if (props['handleValueChange']){
      this.handleValueChange = props.handleValueChange;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.options = this.options.map(option => {
      option.selected = false;
      if (option.value == value) {
        option.selected = true;
      }
      return option;
    });
    
    // Listen changed value
    const changeListener = this.handleValueChange?.(event.target.name);
    changeListener?.(event);
    // Refresh UI
    this.setState({value:event.target.value});
  }

  Option = ({option}) => {
    return (
      <option disabled={option.disabled} value={option['value']?option.value:""}>{option.label}</option>
    );
  }

  render() {
    const noSelected = this.state.value == "";
    const hint = this.hint;
    return (
      <fieldset className={this.className}>
        <label htmlFor={this.name} className="form-label">{this.label}</label>
        <select className="form-select" value={this.state.value} name={this.name} id={this.name} onChange={this.handleChange}>
          <this.Option option={{disabled:true,label:hint}}/>
          {
            this.options.map((option,idx) => (
              <this.Option
                key={idx}
                option={option} 
              />
            ))
          }
        </select>
      </fieldset>
    );
  }
}