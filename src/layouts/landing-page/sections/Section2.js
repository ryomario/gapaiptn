import bg from './img/bg-section2.png';

const Section2 = () => (
  <section style={{zIndex: '100'}}>
      <div className="border-img" style={{'--image-url': 'url('+bg+')'}}>
          <div className="bg-primary text-center p-4">
              <h1 className="fw-bold">Rasionalisasi SNPMPTN</h1>
              <h5 className="mb-5">Siapkan dirimu untuk menggapai masa depan!</h5>
              <div className="d-md-flex justify-content-center align-items-center gap-md-4 text-capitalize fw-bold">
                  <span>buat akun</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                  <span>lengkapi profil</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                  <span>isi nilaimu</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                  <span>ketahui langkahmu</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                  <span style={{minWidth: '100px'}}>tentukan masa depanmu</span>
              </div>
          </div>
      </div>
  </section>
);

export default Section2;