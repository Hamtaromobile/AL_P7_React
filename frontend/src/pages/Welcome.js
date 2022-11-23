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
  let params = new URL(document.location).searchParams;
  let idUser = params.get("id");

  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [employment, setEmployment] = useState("");
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetPost = "http://localhost:3001/api/post/getAllPost/";
  const token = JSON.parse(localStorage.getItem("token"));

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

  useEffect(() => {
    axios
      .get(urlGetPost, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataPost(res.data);
        console.log("datapost", dataPost);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navigation idUser={idUser} />
      <div className="container_welcome">
        <div className="container_tt_welcome">
          <h1>Groupomania post</h1>
        </div>
        <div className="container_imgbtn_post_welcome">
          <div className="container_imgbtn_welcome">
            <NavLink to={`/Profile?id=${idUser}`}>
              <div className="item_profileimg_welcome">
                <Profileimg dataUser={dataUser} />
              </div>
            </NavLink>
            <div>
              <NavLink to={`/createPost?id=${idUser}`}>
                <button type="button" className="btn btn-success btn-lg">
                  Creat post
                </button>
              </NavLink>
            </div>
          </div>

          <div className="item_post_welcome">
            <ul>
              {dataPost.map((post) => (
                <NavLink to={`/Innerpost?id=${post._id}`}>
                  <Post key={post._id} post={post} />
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Welcome;
