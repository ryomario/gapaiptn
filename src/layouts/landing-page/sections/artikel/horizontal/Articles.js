import { Article } from "./Article";

const Articles = ({items}) => (
  <div className="d-flex flex-sm-row flex-column gap-3">
    {
      items?.map((item, idx) => (
        <Article key={idx} item={item}/>
      ))
    }
  </div>
);

export {Articles};