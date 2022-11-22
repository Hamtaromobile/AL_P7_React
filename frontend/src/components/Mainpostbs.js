import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Mainpost = ({ idPost }) => {
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const urlDeletePost = "http://localhost:3001/api/post/deletePost/";
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [statusGetPost, setStatusGetPost] = useState("");

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

  //Get user's data main post
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

  return (
    <div>
      <div className="container-fluid mt-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">
                {" "}
                <img
                  src={dataUser.imageUrl}
                  className="item_img_mpost"
                  alt="Photo de profil"
                />
                <div className="media-body ml-3 item_ch_mp">
                  {" "}
                  {dataUser.firstName} {dataUser.lastName}
                  <div className="text-muted small">{dataUser.employment}</div>
                </div>
                <div className="text-muted small ml-3 item_ch_mp">
                  <div>
                    Member since <strong>01/1/2019</strong>
                  </div>
                  <div>
                    <strong>134</strong> posts
                  </div>
                </div>
              </div>
              <div className="card-body">
                <p>{editContent ? editContent : dataPost.text}</p>
              </div>
              <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                <div className="px-4 pt-3 container_button">
                  {" "}
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Voulez-vous vraiment supprimer ce post ?"
                        )
                      ) {
                        handleDelete();
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit text
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn btn-primary"
                  >
                    annul Edit text
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpost;
