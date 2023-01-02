//import React, { useEffect, useState } from "react";
import Navigation2 from "../components/Navigation2";
import Profileimg from "../components/Profileimg";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { NavLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

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
  const idUser = params.get("id");
  const [dataUser, setDataUser] = useState([]);
  const [dataUserMainPost, setDataUserMainPost] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [statusGetPost, setStatusGetPost] = useState("");
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetAllPost = "http://localhost:3001/api/post/getAllPost/";
  const urlGetUserMainPost = "http://localhost:3001/api/post/getUser/";
  const token = JSON.parse(localStorage.getItem("token"));
  const [navBarBurger, setNavBarBurger] = useState(false);
  const dataChild = {
    setNavBarBurger: setNavBarBurger,
    idUser: { idUser },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataPost.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <ThemeProvider theme={theme}>
      <Navigation2 dataChild={dataChild} />
      <div className="container_home">
        <div className="container_tt_home">
          <h1>Groupomania post</h1>
        </div>
        <div className="container_imgbtn_post_home">
          {!navBarBurger ? (
            <div className="container_imgbtn_home">
              <NavLink to={`/Profile?id=${idUser}`}>
                <div className="item_profileimg_home">
                  <Profileimg dataUser={dataUser} />
                </div>
              </NavLink>
              <div>
                <NavLink to={`/createPost?id=${idUser}`}>
                  <button type="button" className="btn_crtp_home">
                    Create post
                  </button>
                </NavLink>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <Post dataPost={currentPosts} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={dataPost.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Home;
