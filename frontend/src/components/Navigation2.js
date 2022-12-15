import React from "react";
import { useState } from "react";

const Navigation2 = ({ dataChild }) => {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  showLinks
    ? dataChild.setNavBarBurger(true)
    : dataChild.setNavBarBurger(false); //go up state

  // console.log("dataChild.idUserNav2", dataChild.idUser);
  return (
    <nav className={`nav_bar ${showLinks ? "show_nav" : "hide_nav"}`}>
      <div className="navbar_logo">
        <img
          className="img_nav"
          src="/images/icon-left-font-monochrome-black.png"
          alt="icon-left-font-monochrome-white.png"
        />
      </div>
      <ul className="navbar_ul">
        {!dataChild.idUser ? (
          <li className="navbar_item">
            <a href="/Login" className="navbar_link">
              Login
            </a>
          </li>
        ) : (
          ""
        )}
        {!dataChild.idUser ? (
          <li className="navbar_item">
            <a href="/Signup" className="navbar_link">
              Signup
            </a>
          </li>
        ) : (
          ""
        )}
        {dataChild.idUser ? (
          <li className="navbar_item">
            <a href={"/Home?id=" + dataChild.idUser} className="navbar_link">
              Home
            </a>
          </li>
        ) : (
          ""
        )}
        {dataChild.idUser ? (
          <li className="navbar_item">
            <a href={"/Profil?id=" + dataChild.idUser} className="navbar_link">
              Profil
            </a>
          </li>
        ) : (
          ""
        )}
        {dataChild.idUser ? (
          <li className="navbar_item">
            <a href="/Login" className="navbar_link">
              Logout
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
};

export default Navigation2;
