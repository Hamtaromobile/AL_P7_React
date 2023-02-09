import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer style={{backgroundColor: "#FFD7D7", height: "5em", color: "#778899"}}>
      <div className="container_footer">
        <div className="footer_logo">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{width: "100px", height: "100px"}}
          />
        </div>
        <div className="footer_social">
        <FacebookIcon />
        <YouTubeIcon />
        <InstagramIcon />
        <TwitterIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;