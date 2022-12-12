import React from "react";
import Navigation from "../components/Navigation";
import Profileimg from "../components/Profileimg";
import { saveAs } from "file-saver";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import UploadingPost from "../components/UploadingPost";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
/*
const downloadImage = () => {
  saveAs("image_url", "image.jpg"); // Put your image url here.
};*/

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

const Creatpost = () => {
  const [file, setFile] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //const [date, setDate] = useState("");
  const [dataErrorAxios, setDataErrorAxios] = useState("");
  const [dataResAxios, setDataResAxios] = useState("");
  const [dataResStatAxios, setDataResStatAxios] = useState("");
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlPostPost = "http://localhost:3001/api/post/createPost";

  let params = new URL(document.location).searchParams;
  const idUser = params.get("id");

  //get data user
  useEffect(() => {
    axios
      .get(urlGetUser + idUser)
      .then((res) => {
        setDataUser(res.data);
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const textOnChange = (e) => {
    setText(e.target.value);
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  //chgt page
  useEffect(() => {
    if (dataResStatAxios === 201) {
      window.location.href =
        "/Innerpost" + "?idP=" + dataResAxios.postId + "&idU=" + idUser;
    }
  }, [dataResStatAxios === 201]);

  //submit create post
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const token2 = JSON.parse(localStorage.getItem("token2"));
    console.log("token2", token2);
    const date = new Date().toLocaleString();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", idUser);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("date", date);
    axios
      .post(urlPostPost, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          authorization2: `Bearer ${token2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setDataResAxios(res.data);
        setDataResStatAxios(res.status);
      })
      .catch((err) => {
        console.log(err);
        setDataErrorAxios(err);
      });
  };

  return (
    <section>
      <ThemeProvider theme={theme}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Navigation idUser={idUser} />
          <div className="container_nav_back_creatpost">
            <NavLink className="nav_back_creatpost" to={`/Home?id=${idUser}`}>
              <ArrowBackOutlinedIcon
                className="icone_arrowback_creatpost"
                sx={{ fontSize: 35 }}
              />
            </NavLink>
          </div>
          <div className="container_tt_creatpost">
            <Typography component="h1" variant="h3">
              Create post
            </Typography>
          </div>
          <div className="container_creatpost">
            <div>
              <Profileimg dataUser={dataUser} />
            </div>
            <div className="container_titletextsub_creatpost">
              <div>
                <TextField
                  color="secondary"
                  required
                  id="title"
                  label="title"
                  defaultValue="title"
                  value={title}
                  onChange={(e) => titleOnChange(e)}
                />
              </div>
              <div className="container_textfield_text">
                <TextField
                  color="secondary"
                  fullWidth
                  multiline
                  rows={9}
                  required
                  id="text"
                  label="text"
                  defaultValue="text"
                  value={text}
                  onChange={(e) => textOnChange(e)}
                />
              </div>
              <div>
                <label for="image">
                  choose picture
                  <input
                    name="image"
                    id="image"
                    type="file"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <div>
                  <Typography color="#FD2D01">
                    {dataErrorAxios.message}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </section>
  );
};

export default Creatpost;
