import { Input } from "./Input";

export * from "./Input";

export const InputGroup = (props) => {  
  return (
    <div className={"input-group has-validation "+props.className}>
      {
        props['children']?.map((child) => (
          <Input key={child.key} {...child.props}/>
        ))
      }
    </div>
  );
}
