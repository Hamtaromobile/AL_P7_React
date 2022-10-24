import React from "react";
import Navigation from "../components/Navigation";
import Profileimg from "../components/Profileimg";
import { saveAs } from "file-saver";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Up2 from "../components/Up2";
import Box from "@mui/material/Box";
/*
const downloadImage = () => {
  saveAs("image_url", "image.jpg"); // Put your image url here.
};*/

const Home = ({ id }) => {
  const [dataUser, setDataUser] = useState([]);
  const [title, setTitle] = useState("");
  const [texte, setTexte] = useState("");
  const [dataErrorAxios, setDataErrorAxios] = useState("");
  const [dataResAxios, setDataResAxios] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/getUser/" + id)
      .then((res) => {
        setDataUser(res.data);
        console.log("res", res);
        console.log("dataUser", dataUser);
        console.log("dataUserfn", dataUser.firstName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataCreatPost = {
      title: title,
      texte: texte,
    };

    axios
      .post("http://localhost:3001/api/auth/creatPost", dataCreatPost)
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
    if (dataResAxios.status === 201) {
    }
  };

  return (
    <section>
      <Box component="form" onClick={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Navigation id={id} />
        <div className="container_tt_creatpost">
          <Typography component="h1" variant="h3">
            Creat post
          </Typography>
        </div>
        <div className="container_creatpost">
          <div>
            <Profileimg dataUser={dataUser} />
          </div>
          <div className="container_textfield_creatpost">
            <div>
              <TextField
                required
                id="title"
                label="title"
                defaultValue="title"
                value={title}
              />
            </div>
            <div className="item_textfield_text">
              <TextField
                fullWidth
                multiline
                rows={4}
                required
                id="text"
                label="text"
                defaultValue="text"
                value={texte}
              />
            </div>
            <div>
              <Up2 />
            </div>
          </div>
        </div>
      </Box>
    </section>
  );
};

export default Home;
