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

  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlPost = "http://localhost:3001/api/post/createPost";

  let params = new URL(document.location).searchParams;
  const id = params.get("id");
  console.log("idcreatpost", id);

  useEffect(() => {
    axios
      .get(urlGetUser + id)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    //const today = new Date();
    //setDate(JSON.stringify(today.toString()));
    const date = new Date().toLocaleString();
    //console.log("today.toString()", today.toString());
    console.log("date", date);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", id);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("date", date);
    /*const dataCreatePost = {
      userId: id,
      title: title,
      text: text,
    };*/

    axios
      .post(urlPost, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setDataResAxios(res);
      })
      .catch((err) => {
        console.log(err);
        setDataErrorAxios(err);
      });
    console.log("DataResAxiossatus", dataResAxios.status);
    console.log("DataErrorAxiosmsg", dataErrorAxios.message);
  };

  return (
    <section>
      <ThemeProvider theme={theme}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Navigation id={id} />
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
                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </section>
  );
};

export default Creatpost;
