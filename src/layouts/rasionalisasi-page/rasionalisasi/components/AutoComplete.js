import { PropTypes } from "prop-types";
import Feedbacks from "./Feedbacks";

const AutoComplete = (props) => {
  if(!props.data || !Array.isArray(props.data)){
    throw new Error("Autocomplete membutuhkan data[] prop");
  }

  const value = props['value'] ? props.value:"";
  const { isValid, messages } = props.validation(props.value);
  return (
    <fieldset className={props.className}>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <input 
        type="text" 
        className={"form-control"+(isValid ? " is-valid":isValid === false ? " is-invalid":"")} 
        id={props.name} 
        name={props.name}
        placeholder={props.hint}
        maxLength={props.maxLength}
        onChange={(event)=>props['handleValueChange']?.(event.target.name,event.target.value)} 
        value={value}
        required={props.required}
        list={props.name+"-autocomplete-list"}
      />
      <Feedbacks isValid={isValid} messages={messages}/>
      <datalist id={props.name+"-autocomplete-list"}>
        {props.data.map(((item,idx) => (<option key={idx} value={item[props['itemKeyNames']?.value?props['itemKeyNames']?.value:"value"]}>{item[props['itemKeyNames']?.label?props['itemKeyNames']?.label:"label"]}</option>)))}
      </datalist>
    </fieldset>
  );
}

AutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default AutoComplete;