import img from './img/diskusi.png';

const Section4 = () => (
  <section>
    <div className="container-sm mt-5">
      <h1 className="mb-4 text-center">Kenapa Harus GapaiPTN?</h1>
      <div className="row mb-4">
        <div className="col-md-5 mb-2">
          <img src={img} alt="Diskusi" width="100%"/>
        </div>
        <div className="col" style={{textIndent: "2em"}}>
          <p>GapaiPTN hadir sebagai komunitas pendidikan yang mampu memenuhi kebutuhan informasi dalam menunjang persiapanmu memasuki kehidupan perkuliahan.</p>
          <p>Tidak perlu menunggu lebih lama lagi, bergabung dengan komunitas dan jadilah bagian dari kesuksesan.</p>
          <br/>
          <button type="button" className="btn btn-primary btn-lg">Daftar Sekarang</button>
        </div>
      </div>
    </div>
  </section>
);

export {Section4};