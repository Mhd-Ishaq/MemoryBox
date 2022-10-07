import React from "react";
import { NavLink, Link,  useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navListStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          iNoteBook
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link "
                style={navListStyle}
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" style={navListStyle} to="/about">
                About
              </NavLink>
            </li>
          </ul>
          {
            !localStorage.getItem('token') ?(
          
          <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              signup
            </Link>
          </form>
            ):(
              <div className="btn btn-danger " onClick={handleLogout}>Logout</div>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
