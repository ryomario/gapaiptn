const Article = ({item}) => (
  <div className="card shadow">
    <img src={item.img.src} alt={item.img.alt} className="card-img-top" />
    <div className="card-body text-center">
      <h5 className="card-title mb-3">{item.title}</h5>
      <p>{item.desc}</p>
    </div>
  </div>
);

export {Article};