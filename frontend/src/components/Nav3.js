import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav3 = ({idUser}) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header_nav">
    <nav className="container_nav">
    {isTabletOrMobile ? (
      <div>
        <span onClick={toggleMenu} className="menu_button_nav">
          {isMenuOpen ? <MenuIcon/> : <CloseIcon/>}
        </span>
        {isMenuOpen && (
          <ul className="menu_open_nav">
            {idUser ? (
              <>
                <li className="menu_item_nav">
                  <a href={"/Home?id=" + idUser} className="menu_link_nav">Home</a>
                </li>
                <li className="menu_item_nav">
                  <a href={"/Profile?id=" + idUser} className="menu_link_nav">Profil</a>
                </li>
                <li className="menu_item_nav">
                  <a href="/Login" className="menu_link_nav">Logout</a>
                </li>
              </>
            ) : (
              <>
                <li className="menu_item_nav">
                  <a href="/Login" className="menu_link_nav">Login</a>
                </li>
                <li className="menu_item_nav">
                  <a href="/Signup" className="menu_link_nav">Signup</a>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    ) : (
      <div>
        <ul className="menu_nav">
          {idUser ? (
            <>
              <li className="menu_item_nav">
                <a href={"/Home?id=" + idUser} className="menu_link_nav">Home</a>
              </li>
              <li className="menu_item_nav">
                <a href={"/Profile?id=" + idUser} className="menu_link_nav">Profil</a>
              </li>
              <li className="menu_item_nav">
                <a href="/Login" className="menu_link_nav">Logout</a>
              </li>
            </>
          ) : (
            <>
              <li className="menu_item_nav">
                <a href="/Login" className="menu_link_nav">Login</a>
              </li>
              <li className="menu_item_nav">
                <a href="/Signup" className="menu_link_nav">Signup</a>
              </li>
            </>
          )}
        </ul>
      </div>
    )}
  </nav>
  <div className="logo_nav">
      <img
        className="img_nav"
        src="/images/icon-left-font-monochrome-black.png"
        alt="icon-left-font-monochrome-white.png"
      />
  </div>
</header>

  );
};

export default Nav3;
