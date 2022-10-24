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
  let id = params.get("id");
  console.log("id", id);

  const [dataUser, setDataUser] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [employment, setEmployment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/getUser/" + id)
      .then((res) => {
        setDataUser(res.data);
        // console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("dataUser", dataUser);
  console.log("dataUserfn", dataUser.firstName);
  //setFirstName(dataUser.firstName);
  // console.log("firstName", firstName);
  const [dataPosts, setDataPosts] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <Navigation id={id} />
      <div className="container_welcome">
        <div className="container_tt_welcome">
          <h1>Groupomania post</h1>
        </div>
        <div className="container_imgbtn_post_welcome">
          <div className="container_imgbtn_welcome">
            <NavLink to={`/Profile?id=${id}`}>
              <div className="item_profileimg_welcome">
                <Profileimg dataUser={dataUser} />
              </div>
            </NavLink>
            <div>
              <NavLink to={`/creatPost?id=${id}`}></NavLink>
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
