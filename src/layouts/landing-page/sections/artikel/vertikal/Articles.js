import { Article } from "./Article";

const Articles = (props) => (
  <div className="d-flex flex-column gap-3 mb-5">
    {
      props.items?.map((item, idx) => (
        <Article key={idx} item={item}/>
      ))
    }
  </div>
);

export {Articles};