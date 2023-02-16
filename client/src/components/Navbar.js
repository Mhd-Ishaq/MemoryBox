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
    <nav className="navbar">
      <div className="container-left">
        <Link  className="nav-link head button"  to="#">
        MemoryBox
        </Link>
            <NavLink
              className="nav-link button "
              style={navListStyle}
              aria-current="page"
              to="/home"
            >
              Home
            </NavLink>
      </div>

      <div className="container-right">
        {!localStorage.getItem("token") ? (
          <form className="d-flex">
            <Link className="btn btn-primary mx-1 button" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-1 button" to="/signup" role="button">
              Signup
            </Link>
          </form>
        ) : (
          <div className="btn btn-danger button " onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
