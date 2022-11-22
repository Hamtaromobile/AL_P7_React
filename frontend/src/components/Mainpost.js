import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Mainpost = ({ idPost }) => {
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const urlDeletePost = "http://localhost:3001/api/post/deletePost/";
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [statusGetPost, setStatusGetPost] = useState("");
  const [file, setFile] = useState();

  //Get data main post
  useEffect(() => {
    axios
      .get(urlGetPost + idPost, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataPost(res.data);
        setStatusGetPost(res.status);
        console.log("resPost", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("dataPost.userId", dataPost.userId);

  //Get user data main post
  useEffect(() => {
    const getUserReq = async () => {
      try {
        const res = await axios.get(urlGetUser + dataPost.userId, {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setDataUser(res.data);
        console.log("resUser", res);
      } catch (err) {
        console.log(err);
      }
    };
    getUserReq();
  }, [statusGetPost === 200]);

  //Delete main post
  const handleDelete = () => {
    axios
      .delete(urlDeletePost + idPost, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("resDeletePost", res);
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.reload();
  };

  //submit change
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const editDate = new Date().toLocaleString();
    console.log("date", date);
    const formData = new FormData();

    if (firstName.length === 0) {
      firstName = dataUser.firstName;
    }
    if (lastName.length === 0) {
      lastName = dataUser.lastName;
    }
    if (employment.length === 0) {
      employment = dataUser.employment;
    }
    if (email.length === 0) {
      email = dataUser.email;
    }

    formData.append("image", file);
    formData.append("userId", dataPost.userId);
    formData.append("title", editTitle);
    formData.append("text", editText);
    formData.append("date", editDate);

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
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <link
        href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <div class="container">
        <div id="blog" class="row">
          <div class="col-md-10 blogShort">
            {editing ? (
              <textarea
                className="txt_area_title"
                defaultValue={editTitle ? editTitle : dataPost.title}
                autoFocus
                onChange={(e) => setEditTitle(e.target.value)}
              ></textarea>
            ) : (
              <h1>{dataPost.title}</h1>
            )}
            <p>
              le {dataPost.date} par {dataUser.firstName} {dataUser.lastName}{" "}
            </p>
            <img
              src={dataPost.imageUrl}
              alt="post img"
              class="pull-left img-responsive thumb margin10 img-thumbnail"
            />
            <article>
              {editing ? (
                <textarea
                  className="txt_area_text"
                  defaultValue={editText ? editText : dataPost.text}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                ></textarea>
              ) : (
                <p>{editText ? editText : dataPost.text}</p>
              )}
            </article>
            <button
              onClick={() => {
                if (
                  window.confirm("Voulez-vous vraiment supprimer ce post ?")
                ) {
                  handleDelete();
                }
              }}
            >
              Delete
            </button>
            {editing ? (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-primary"
              >
                annul Edit text
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                Edit
              </button>
            )}
            {editing ? (
              <button type="button" className="btn btn-primary">
                change picture
              </button>
            ) : (
              ""
            )}
            {editing ? (
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                confirm
              </button>
            ) : (
              ""
            )}
            {editing ? <input type="file" onChange={handleChange} /> : ""}
          </div>

          <div class="col-md-12 gap10"></div>
        </div>
      </div>
    </div>
  );
};

export default Mainpost;
