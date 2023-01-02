import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="container-fluid my-5">
      <footer className="text-center text-lg-start footer">
        <div className="container d-flex justify-content-center py-5">
          <button
            type="button"
            className="btn  btn-lg btn-floating mx-2 btn_footer"
          >
            <FacebookIcon />
          </button>
          <button
            type="button"
            className="btn btn-lg btn-floating mx-2 btn_footer"
          >
            <YouTubeIcon />
          </button>
          <button
            type="button"
            className="btn btn-lg btn-floating mx-2 btn_footer"
          >
            <InstagramIcon />
          </button>
          <button
            type="button"
            className="btn btn-lg btn-floating mx-2 btn_footer"
          >
            <TwitterIcon />
          </button>
        </div>

        <div className="text-center text-white p-3 txt_footer">
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
