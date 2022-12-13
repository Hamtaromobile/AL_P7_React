//import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Navigation2 from "../components/Navigation2";
import Profileimg from "../components/Profileimg";
import Footer from "../components/Footer";
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

const Home = () => {
  let params = new URL(document.location).searchParams;
  let idUser = params.get("id");

  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetAllPost = "http://localhost:3001/api/post/getAllPost/";
  const token = JSON.parse(localStorage.getItem("token"));

  //Get user
  useEffect(() => {
    axios
      .get(urlGetUser + idUser, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Get all post
  useEffect(() => {
    axios
      .get(urlGetAllPost)
      .then((res) => {
        setDataPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("datapost123", dataPost);

  return (
    <ThemeProvider theme={theme}>
      <Navigation2 />
      <div className="container_home">
        <div className="container_tt_home">
          <h1>Groupomania post</h1>
        </div>
        <div className="container_imgbtn_post_home">
          <div className="container_imgbtn_home">
            <NavLink to={`/Profile?id=${idUser}`}>
              <div className="item_profileimg_home">
                <Profileimg dataUser={dataUser} />
              </div>
            </NavLink>
            <div>
              <NavLink to={`/createPost?id=${idUser}`}>
                <button type="button" className="btn btn-success btn-lg">
                  Create post
                </button>
              </NavLink>
            </div>
          </div>

          <div>
            <ul>
              {dataPost.map((dataPost) => (
                <NavLink
                  to={`/Innerpost?idP=${dataPost._id}&idU=${idUser}`}
                  className="item_post_home"
                >
                  <Post key={dataPost._id} dataPost={dataPost} />
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Home;
