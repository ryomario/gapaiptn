import { useNavigate, NavLink } from "react-router-dom";
import FormCard from "./FormCard";

const RasionalisasiPage = () => (
  <>
    <div className="bg-image h-100 fixed-top" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/img/hand-drawn-abstract-shapes-wallpaper_23.png)", zIndex: -999}}></div>
    <div className="container-fluid px-lg-4">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-9 col-md-7 col-lg-6 text-center p-0 my-2">
          <FormCard/>
        </div>
      </div>
    </div>
  </>
);

export const ErrorRasionalisasiPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-image h-100 fixed-top" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/img/hand-drawn-abstract-shapes-wallpaper_23.png)", zIndex: -999}}></div>
      <div className="container-md p-4">
        <div className="card text-center bg-opacity-75 bg-light pt-5 my-md-5">
          <h1 className="text-danger mb-4">Oops!</h1>
          <h2>We are currently maintaining our RasionalisasiPage</h2>
          <div className='mb-4'>
            Sorry Website is Under Development, Please Come Back or Go to Homepage!
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

export default RasionalisasiPage;