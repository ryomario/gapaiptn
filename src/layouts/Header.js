import { NavLink } from "react-router-dom";
import logo from '../images/Logo teks.png';

const Header = ({links}) => {
  const linkClassName = ({isActive}) => "nav-link" + (isActive ? " active" : "");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top shadow" style={{minHeight: "60px"}}>
        <div className="container-xl">
            <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="GapaiPTN" height="25"/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigations">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto align-items-center">
                  {
                    Object.keys(links).map(key => {
                      const link=links[key];
                      return (
                        <li key={key} className="nav-item">
                          <NavLink to={link.href} className={(arg)=>linkClassName(arg) + (link.isDisabled ? " disabled" : "")}>{link.name}</NavLink>
                        </li>
                      );
                    })
                  }
                  <li className="nav-item">
                    <button role="button" className="btn btn-outline-dark btn-sm rounded-pill m-2">
                      <i className="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>
                      Masuk
                    </button>
                  </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default Header;