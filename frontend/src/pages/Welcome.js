//import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Profileimg from "../components/Profileimg";
import Post from "../components/Post";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFB6C1",
      main: "#FFD7D7",
      dark: "#F08080",
      contrastText: "#000",
    },
    secondary: {
      light: "#D3D3D3",
      main: "#778899",
      dark: "#4E5166",
      contrastText: "#fff",
    },
    status: {
      danger: "#FD2D01",
    },
  },
});

const Welcome = () => {
  //const [blogData, setBlogData] = useState([]);
  const [dataPosts, setDataPosts] = useState([]);
  const getDataPosts = () => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => setDataPosts(res.data));
  };
  useEffect(() => getDataPosts(), []);

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <div className="container_welcome">
        <div className="container_tt_welcome">
          <h1>Groupomania post</h1>
        </div>
        <div className="container_imgbtn_post_welcome">
          <div className="container_imgbtn_welcome">
            <NavLink to="/Profile">
              <div className="item_profileimg_welcome">
                <Profileimg />
              </div>
            </NavLink>
            <div>
              <Button
                href="/Creatpost"
                variant="contained"
                color="secondary"
                className="button_welcome"
              >
                CreatPost
              </Button>{" "}
            </div>
          </div>
          <NavLink to="/Innerpost">
            <div className="item_post_welcome">
              <ul>
                {dataPosts.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
              </ul>
            </div>
          </NavLink>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Welcome;
