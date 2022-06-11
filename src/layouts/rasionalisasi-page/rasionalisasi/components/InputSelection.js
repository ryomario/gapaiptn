import { PropTypes } from "prop-types";
import Feedbacks from "./Feedbacks";

const Option = ({option}) => {
  return (
    <option disabled={option.disabled} value={option['value']?option.value:""}>{option.label}</option>
  );
}

const InputSelection = (props) => {
  const validation = props['validation']?props['validation']:(()=>{return {}});
  const value = props['value'] ? props.value:"";
  const { isValid, messages } = validation(props.value);
  // console.log(props.value != props.lastVal);
  // if (props.value != props.lastVal) props['handleValueChange']?.(props.name,props.value);
  return (
    <fieldset className={props.className}>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <select 
      className={"form-select"+(isValid ? " is-valid":isValid === false ? " is-invalid":"")}
      value={value} 
      onChange={(event) => props['handleValueChange']?.(event.target.name,event.target.value)}
      name={props.name} 
      required={props.required}
      id={props.name} >
        <Option option={{disabled:true,label:props.hint}}/>
        {
          props.options.map((option,idx) => (
            <Option
              key={idx}
              option={option} 
            />
          ))
        }
      </select>
      <Feedbacks isValid={isValid} messages={messages}/>
    </fieldset>
  );
}

InputSelection.propTypes = {
  options: PropTypes.array.isRequired
}

export default InputSelection;