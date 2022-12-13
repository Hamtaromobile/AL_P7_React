import React, { Component } from "react";
import { useState } from "react";

const Navigation2 = () => {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  console.log(showLinks);
  return (
    <nav className={`navbar ${showLinks ? "show_nav" : "hide_nav"}`}>
      <div className="navbar_logo">
        <img
          className="img_nav"
          src="/images/icon-left-font-monochrome-black.png"
          alt="icon-left-font-monochrome-white.png"
        />
      </div>
      <ul className="navbar_ul">
        <li className="navbar_item">
          <a href="" className="navbar_link">
            Accueil
          </a>
        </li>
        <li className="navbar_item">
          <a href="" className="navbar_link">
            Login
          </a>
        </li>
        <li className="navbar_item">
          <a href="" className="navbar_link">
            Signup
          </a>
        </li>
        <li className="navbar_item">
          <a href="" className="navbar_link">
            Exite
          </a>
        </li>
      </ul>
      <button className="navbar_burger" onClick={handleShowLinks}>
        <span className="burger_bar"></span>
      </button>
    </nav>
  );
};

export default Navigation2;
