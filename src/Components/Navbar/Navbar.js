import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Navbar(props) {

  function LogUot() {
    document.cookie = `username=${document.cookie}; expires=Sun Jan 08 2020 21:55:19 GMT+0300 (Arabian Standard Time); path=/`;
    window.location.pathname = `/`;
  };

  let menuLogIn = 
  <div className="menu">
    <Link to="/">
      <button>
        home
      </button>
    </Link>
    <Link to="/sign-up">
      <button>
        Sign Up
      </button>
    </Link>
    <Link to="/log-in">
    <button>
      Log In
    </button>
    </Link>
  </div>;

  let menuLogOut = 
  <div className="menu">
      <button onClick={() => {
        LogUot();
      }}>
        log out
      </button>
  </div>;

  return (
    <>
      <nav className="nav">
        <div className="ctn"
        style={{
          flexDirection: 
          props.logIN_logOut === true 
          ? "row"
          : "column",
          justifyContent:
          props.logIN_logOut === true 
          ? "space-between"
          : "flex-start"
          ,
        }}>
          <Link to="/" className="logo">
              universe
          </Link>
          {
            props.logIN_logOut === true 
            ? menuLogOut
            : menuLogIn
          }
        </div>
      </nav>
      {
        props.logIN_logOut === true 
        ? null 
        : <Outlet />
      }
      {
        props.logIN_logOut === true 
        ? null 
        : <Footer />
      }      
    </>
  )
}
export default Navbar;