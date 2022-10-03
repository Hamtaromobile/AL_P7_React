import React from "react";
import Navigation from "../components/Navigation";
import Profileimg from "../components/Profileimg";
import { saveAs } from "file-saver";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const downloadImage = () => {
  saveAs("image_url", "image.jpg"); // Put your image url here.
};

const Home = () => {
  return (
    <section>
      <Navigation />
      <div className="container_tt_creatpost">
        <Typography component="h1" variant="h3">
          Creat post
        </Typography>
      </div>
      <div className="container_creatpost">
        <div>
          <Profileimg />
        </div>
        <div className="container_textfield_creatpost">
          <div>
            <TextField required id="title" label="title" defaultValue="title" />
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
            />
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
