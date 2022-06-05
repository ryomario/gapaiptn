import { NavLink } from 'react-router-dom';
import bg from './img/bg-section1.png';

const Section1 = ({btnLink}) => (
  <section className="overflow-hidden">
      <div className="bg-image row justify-content-end align-items-center align-items-lg-baseline" style={{backgroundImage: 'url('+bg+')', minHeight: 'calc(100vh - 200px)', backgroundPositionY: 'top'}}>
          <div className="col-lg-4 m-lg-4 px-lg-0 px-4 text-center" style={{zIndex: '200'}}>
              <div className="card p-4 bg-white bg-opacity-75">
                  <h1 className="fw-bold text-wrap mb-sm-4">Yuk uji peluangmu menjadi mahasiswa baru dikampus impian</h1>
                  <NavLink to={btnLink} className="btn btn-primary btn-lg text-uppercase fw-bold">Uji Peluangmu</NavLink>
              </div>
          </div>
      </div>
  </section>
);

export {Section1};