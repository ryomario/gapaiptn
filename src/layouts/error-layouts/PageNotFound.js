import { NavLink, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-image h-100 fixed-top" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/img/hand-drawn-abstract-shapes-wallpaper_23.png)", zIndex: -999}}></div>
      <div className="container-md p-4">
        <div className="card text-center bg-opacity-75 bg-light pt-5 my-md-5">
          <h1 className="text-danger mb-4">Oops!</h1>
          <h2>404 Not Found</h2>
          <div className='mb-4'>
            Sorry, an error has occured, Requested page not found!
          </div>
          <div className="d-flex justify-content-center gap-4 mb-4">
            <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Go Back</button>
            <NavLink to="/">
              <button className="btn btn-secondary btn-lg">Homepage</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;