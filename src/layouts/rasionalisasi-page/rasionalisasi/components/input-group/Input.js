export const Input = (props) => {
  const {name,type,min,max,onChange} = props;
  const inputProps = {name,type,min,max,onChange};
  const {isValid,messages} = props['validation']?props['validation']:{};
  return (
    <>
      <span className="input-group-text">{props['shortLabel']?props['shortLabel']:props['label']}</span>
      <input {...inputProps} className={"form-control "+props['className']+(isValid?" is-valid":isValid === false?" is-invalid":"")} placeholder={props['label']} />
      {
        isValid == false?(
          <div className={"feedback invalid-feedback"}>
            {
              messages?.map((msg,idx) =>(<div key={idx}>{msg}</div>))
            }
          </div>
        ):undefined
      }
    </>
  );
}