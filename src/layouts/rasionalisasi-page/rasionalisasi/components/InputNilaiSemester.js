import {InputGroup, Input} from "./input-group";
import './input-semester-style.css';

const InputNilaiSemester = (props) => {
  const validation = props['validation'] || (() => {return {};});
  const inputGroups = props['inputGroups']
  const nameGenerator = props['nameGenerator'];
  return (
    <fieldset className={props.className}>
      <label className="form-label">{props['label']?props['label']:"Semester n"}</label>
      {
        inputGroups?.map((inputs,idx) => (
          <InputGroup key={idx} className="mb-2" name={idx}>
            {
              inputs?.map((input,idx) => (
                <Input 
                  key={idx}
                  type="number"
                  min="0"
                  max="100"
                  name={nameGenerator(input['name'],props['name'])} 
                  label={input['label']} 
                  shortLabel={input['shortLabel']} 
                  validation={validation(props['values']?.[nameGenerator(input['name'],props['name'])],input['label'])}
                  value={props['values']?.[nameGenerator(input['name'],props['name'])]}
                  onChange={(event) => props['handleChange']?.(event.target.name,event.target.value,input['label'])}
                  className={"input-semester "+(input['isValid']?"is-valid":input['isValid'] === false?"is-invalid":"")}
                  />
              ))
            }
          </InputGroup>
        ))
      }
    </fieldset>
  );
}

export default InputNilaiSemester;