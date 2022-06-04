import { Route, Routes } from 'react-router-dom';
import PageNotFound from './layouts/error-layouts/PageNotFound';

import Header from './layouts/Header';

const links = [
  {
    key:"landing-page",
    href:"/",
    name:"Home"
  },
  {
    key:"rasionalisasi-page",
    href:"/rasionalisasi",
    name:"Rasionalize"
  },
  {
    key:"event",
    href:"/event",
    name:"Event"
  },
  {
    key:"artikel",
    href:"/article",
    name:"Article"
  },
  {
    key:"forum",
    href:"/forum",
    name:"Forum"
  },
  {
    key:"about",
    href:"/about",
    name:"About"
  },
]

function App() {
  return (
    <div className="d-flex flex-column" style={{paddingTop: "60px"}}>
      <Header links={links}/>
      <Routes>
        {/* <Route path='/' element={<LandingPage />} /> */}
        {/* <Route path='/rasionalisasi' element={}/> */}
        <Route path="*" index element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
