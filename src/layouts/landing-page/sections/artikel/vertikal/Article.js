const Article = ({item}) => (
  <div className="card shadow">
    <div className="row g-0">
      <div className="col-lg-5">
        <div className="m-3 overflow-hidden rounded-2">
          <img src={item.img.src} alt={item.img.alt} width="100%"/>
        </div>
      </div>
      <div className="col">
        <div className="card-body">
          <div className="card-subtitle text-muted mb-2">
            <h5 className="text-uppercase fw-bold mb-0">{item.type}</h5>
            <h5 className="mb-0">{item.year}</h5>
          </div>
          <h4 className="text-center mb-3">{item.title}</h4>
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  </div>
);

export {Article};