import Feedbacks from "./Feedbacks";


const InputText = (props) => {
  // console.log(this.props.name,this.state);
  const validation = props['validation']?props['validation']:(()=>{return {}});
  const value = props['value'] ? props.value:"";
  const { isValid, messages } = validation(props.value);
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
        autoFocus={props.autoFocus}
        inputMode="next"
      />
      <Feedbacks isValid={isValid} messages={messages}/>
    </fieldset>
  );
}

export default InputText;