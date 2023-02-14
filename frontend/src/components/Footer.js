import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="social-icons">
				<FacebookIcon />
				<YouTubeIcon />
				<InstagramIcon />
				<TwitterIcon />
			</div>
			<div className="copyright">© 2023</div>
		</footer>
	);
};

export default Footer;
