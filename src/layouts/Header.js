import { NavLink } from "react-router-dom";

const Header = ({links}) => {
  const linkClassName = ({isActive}) => "nav-link" + (isActive ? " active" : "");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top shadow" style={{minHeight: "60px"}}>
        <div className="container-xl">
            <NavLink className="navbar-brand" to="/">
                <img src={process.env.PUBLIC_URL + '/img/Logo teks.png'} alt="GapaiPTN" height="25"/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigations">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto align-items-center">
                  {
                    links.map(link => (
                      <li key={link.key} className="nav-item">
                        <NavLink to={link.href} className={linkClassName}>{link.name}</NavLink>
                      </li>
                    ))
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