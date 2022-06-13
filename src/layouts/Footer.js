import logo from '../images/Logo icon & teks.png';

const Footer = () => (
  <footer className="text-center text-lg-start bg-light text-muted mt-auto">
      <section className="ps-4 pe-4 pt-4">
          <div className="container-fluid">
              <div className="row mt-3">
                  <div className="col-lg-3 text-center mb-4">
                      <img src={logo} alt="GapaiPTN" width="100px" />
                      <div className="d-flex flex-wrap mt-2 justify-content-center">
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#000', border: 'none',}}
                          href="#"
                          title="TikTok"
                          ><i className="bi bi-tiktok"></i></a>
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#F00073', border: 'none'}}
                          href="#"
                          ><i className="bi bi-instagram"></i></a>
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#ff0000', border: 'none'}}
                          href="#"
                          ><i className="bi bi-youtube"></i></a>
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#0088CC', border: 'none'}}
                          href="#"
                          ><i className="bi bi-telegram"></i></a>
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#1DA1F2', border: 'none'}}
                          href="#"
                          ><i className="bi bi-twitter"></i></a>
                          <a 
                          className="btn btn-primary btn-dark m-1"
                          style={{backgroundColor: '#2867B2', border: 'none'}}
                          href="#"
                          ><i className="bi bi-linkedin"></i></a>
                      </div>
                  </div>
                  <div className="col-lg-2 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold mb-4">
                          Our Site Offering
                      </h6>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Education Article</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Discussion Forum</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Free Event</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Rationalize Chance</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Longlast Partnership</a>
                      </p>
                  </div>
                  <div className="col-lg-2 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold mb-4">
                          Support
                      </h6>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Contact Us</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">FAQ</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Downloads Gapai Assets</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Locate An Academic Mentor</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Universities Connections</a>
                      </p>
                  </div>
                  <div className="col-lg-2 mx-auto mb-4">
                      <h6 className="text-uppercase fw-bold mb-4">
                          Gapai PTN
                      </h6>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">About Us</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Gapai Program</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Organization Member</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">IT Developer Partner</a>
                      </p>
                      <p>
                          <a href="#" className="text-reset text-decoration-none">Help & Report Problem</a>
                      </p>
                  </div>
                  <div className="col-lg-3 mx-auto text-center mb-4">
                      <h4 className="text-uppercase fw-bold mb-4">Mari Raih Bersama Kampus Impianmu!</h4>
                      <p className="fs-5">Mulai Terhubung dengan Kami</p>
                      <form className="d-flex input-group">
                          <input className="form-control" type="email" placeholder="Enter your email address" aria-label="Email"/>
                          <button className="btn btn-primary" type="submit">Subscribe</button>
                      </form>
                  </div>
              </div>
          </div>
      </section>
      
      <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
          © 2022 Copyright:
          <a className="text-reset fw-bold text-decoration-none" href="#">Argent AI Team</a>
      </div>
  </footer>
);

export default Footer;