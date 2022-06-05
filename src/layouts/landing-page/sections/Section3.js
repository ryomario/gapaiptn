import bgV1 from './artikel/img/Image Article Preview vertical 1.jpg';
import bgV2 from './artikel/img/Image Article Preview vertical 2.png';
import bgH1 from './artikel/img/Image Article Preview.png';
import bgH2 from './artikel/img/Image Article Preview-1.png';
import bgH3 from './artikel/img/Image Article Preview-2.png';
import bgH4 from './artikel/img/Image Article Preview-3.png';

import {Articles as VArticles} from './artikel/vertikal';
import {Articles as HArticles} from './artikel/horizontal';

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
];
const articlesH = [
  {
    img: {
      src: bgH1,
      alt: "Artikel Wisuda"
    },
    title: "Wisuda",
    desc: "Persiapkan dirimu sebelum berpisah."
  },
  {
    img: {
      src: bgH2,
      alt: "Artikel Kerja"
    },
    title: "Kerja",
    desc: "Langkah Menjadi Profesional"
  },
  {
    img: {
      src: bgH3,
      alt: "Artikel Hobi"
    },
    title: "Hobi",
    desc: "Berikan Hadiah Kepada Dirimu"
  },
  {
    img: {
      src: bgH4,
      alt: "Artikel Fakta"
    },
    title: "Fakta",
    desc: "Temukan Hal Baru"
  },
];

const Section3 = () => (
  <section className="bg-image" style={{backgroundImage: 'url('+process.env.PUBLIC_URL+'/img/hand-drawn-abstract-shapes-wallpaper_23.png)', paddingTop: '100px'}}>
    <div className="container-lg my-4">
      <div className="text-center">
        <h1 className="text-uppercase fw-bold text-decoration-underline mb-4">Artikel</h1>
        <p>Mulai membaca artikel pilihan dan perluas cakrawala pengetahuan.</p>
      </div>
      <VArticles items={articlesV}/>
      <HArticles items={articlesH}/>
    </div>
  </section>
);

export default Section3;