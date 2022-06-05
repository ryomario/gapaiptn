import { Route, Routes } from 'react-router-dom';
import PageNotFound from './layouts/error-layouts/PageNotFound';
import Footer from './layouts/Footer';

import Header from './layouts/Header';
import LandingPage, { ErrorLandingPage } from './layouts/landing-page/LandingPage';
import RasionalisasiPage, { ErrorRasionalisasiPage } from './layouts/rasionalisasi-page/RasionalisasiPage';

const links = {
  "landing-page":{
    href:"/",
    name:"Home",
    isDeployed:true,
    isDisabled:false,
  },
  "rasionalisasi-page":{
    href:"/rasionalisasi",
    name:"Rasionalize",
    isDeployed:true,
    isDisabled:false,
  },
  "event":{
    href:"/event",
    name:"Event",
    isDeployed:false,
    isDisabled:true,
  },
  "artikel":{
    href:"/article",
    name:"Article",
    isDeployed:false,
    isDisabled:true,
  },
  "forum":{
    href:"/forum",
    name:"Forum",
    isDeployed:false,
    isDisabled:true,
  },
  "about":{
    href:"/about",
    name:"About",
    isDeployed:false,
    isDisabled:true,
  },
}

function App() {
  return (
    <div className="d-flex flex-column" style={{paddingTop: "60px", minHeight: '100vh'}}>
      <Header links={links}/>
      <Routes>
        <Route path='/' element={links['landing-page'].isDeployed ? <LandingPage /> : <ErrorLandingPage/>} />
        <Route path='/rasionalisasi' element={links['rasionalisasi-page'].isDeployed ? <RasionalisasiPage /> : <ErrorRasionalisasiPage/>}/>
        <Route path="*" index element={<PageNotFound />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
