import React from "react";

const Navigation = ({ id }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg secondary-color static-top">
        <div className="container_nav">
          <div className="container_img_nav">
            <img
              className="img_nav"
              src="/images/icon-left-font-monochrome-white.png"
              alt="icon-left-font-monochrome-white.png"
            />
          </div>

          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li>
                <a
                  className="nav-link hover-link"
                  aria-current="page"
                  href="/Login"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="nav-link hover-link"
                  href="/Signup"
                  aria-current="page"
                >
                  Signup
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={id != undefined ? "/Welcome" + "?id=" + id : "/Welcome"}
                  aria-current="page"
                >
                  Welcome
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
