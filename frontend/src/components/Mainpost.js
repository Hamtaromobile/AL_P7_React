import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Mainpost = ({ id }) => {
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const [dataUser, setDataUser] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    axios
      .get(urlGetPost + id, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataPost(res.data);
        console.log("resPost", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("dataPost", dataPost);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await axios.get(urlGetUser + dataPost.userId);
        setDataUser(res.data);
        console.log("res.dataUser", res.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    getDataUser();
  }, []);

  return (
    <article className="container_mainpost">
      <div className="container_date_mainpost">
        <p>date</p>
      </div>
      <div className="container_memberpost_mainpost">
        <div className="container_member_mainpost">
          <div>
            <img
              className="item_img_mainpost"
              src={dataUser.imageUrl != undefined ? dataUser.imageUrl : ""}
              alt="Photo de profil"
              style={{
                border:
                  dataUser.imageUrl != undefined ? "1px  solid #FD2D01" : "",
              }}
            />
          </div>
          <p>{dataUser.firstName}</p>
          <p>{dataUser.lastName}</p>
        </div>
        <div className="container_post_mainpost">
          <div>
            <h2 className="item_tt_mainpost">{dataPost.title}</h2>
            <div className="borderbot_tt"></div>
            <div className="container_txtimg_mainpost">
              <p>{dataPost.text}</p>
              <p>img</p>
            </div>
          </div>
          <div className="container_logo_mainpost">
            <img className="logo_mainpost" src="./images/icon-left-font.png" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Mainpost;
