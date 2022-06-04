import bgV1 from './artikel/img/Image Article Preview vertical 1.jpg';
import bgV2 from './artikel/img/Image Article Preview vertical 2.png';

import {Articles as VArticles} from './artikel/vertikal';

const articlesV = [
  {
    img: {
      src: bgV1,
      alt: "Artikel 1"
    },
    type: "motivasi",
    year: 2022,
    title: "G-20 Kagum dengan Pesona Kecerdasan & Kecantikan Pemudi Indonesia",
    desc: "Ketika Maudy Ayunda siap tunjukan kemampuan sebagai juru bicara kebanggan Indonesia. Tidak hanya menjadi sorotan yang ikut andil dalam mengangkat isu global, tetapi juga menjadi bagian dari perhatian Inspiring Women Forbes Indonesia edisi April 2022."
  },
  {
    img: {
      src: bgV2,
      alt: "Artikel 2"
    },
    type: "edukasi",
    year: 2022,
    title: "Boleh Coba Kesempatan bagi Mahasiswa untuk Terbang ke Luar Negeri Nih",
    desc: "Indonesian International Student Mobility Awards (IISMA) sebagai salah satu program merdeka bagi mahasiswa untuk mendunia. Program ini dibuka setahun sekali dengan harapan selama 1 semester studi mahasiswa memperoleh ilmu, pengalaman, dan budaya baru untuk dunia kerja nantinya."
  }
]

const Section3 = () => (
  <section className="bg-image" style={{backgroundImage: 'url('+process.env.PUBLIC_URL+'/img/hand-drawn-abstract-shapes-wallpaper_23.png)', paddingTop: '100px'}}>
    <div className="container-lg my-4">
      <div className="text-center">
        <h1 className="text-uppercase fw-bold text-decoration-underline mb-4">Artikel</h1>
        <p>Mulai membaca artikel pilihan dan perluas cakrawala pengetahuan.</p>
      </div>
      <VArticles items={articlesV}/>
    </div>
  </section>
);

export default Section3;