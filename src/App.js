import { Route, Routes } from 'react-router-dom';
import PageNotFound from './layouts/error-layouts/PageNotFound';

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
    isDeployed:false,
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
    <div className="d-flex flex-column" style={{paddingTop: "60px"}}>
      <Header links={links}/>
      <Routes>
        <Route path='/' element={links['landing-page'].isDeployed ? <LandingPage /> : <ErrorLandingPage/>} />
        <Route path='/rasionalisasi' element={links['rasionalisasi-page'].isDeployed ? <RasionalisasiPage /> : <ErrorRasionalisasiPage/>}/>
        <Route path="*" index element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
