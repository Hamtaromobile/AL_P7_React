import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

const Navigation2 = () => {
  return (
    <div>
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={this.showSettings} className="menu-item--small" href="">
          Settings
        </a>
      </Menu>
    </div>
  );
};

export default Navigation2;
