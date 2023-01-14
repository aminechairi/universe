import React from "react";
import Navbar from "../Navbar/Navbar";
import { FiUsers } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import "./Account.css";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Account() {

  return (
    <>
      <Navbar logIN_logOut={true} />
      <div className="ab_menu">
        <div className="ctnw">
          <ul className="menu">
            <Link to="/">
              <li><AiFillHome className="i"/> <span>home</span></li>
            </Link>
            <Link to="/users">
              <li><FiUsers className="i"/> <span>users</span></li>
            </Link>
          </ul>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Account;