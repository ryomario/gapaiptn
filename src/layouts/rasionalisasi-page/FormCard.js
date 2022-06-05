import Rasionalisasi from "./rasionalisasi";

const FormCard = () => (
  <div className="card bg-primary px-0 pt-4 pb-0 my-3">
    <h1 className="text-uppercase fw-bold px-2">Rasionalisasi SNMPTN</h1>
    <p className="mb-4 px-2">Isi form berikut untuk mengetahui kesempatanmu.</p>

    <div className="row">
      <div className="col-md-12 mx-0">
        <Rasionalisasi/>
      </div>
    </div>
  </div>
);

export default FormCard;