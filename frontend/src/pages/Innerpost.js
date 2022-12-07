import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Mainpost from "../components/Mainpost";
import { NavLink } from "react-router-dom";

import Reply from "../components/Reply";

const Innerpost = () => {
  const params = new URL(document.location).searchParams;
  const idPost = params.get("idP");
  const idUser = params.get("idU");
  const [dataPostIdReplies, setDataPostIdReplies] = useState([]);
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const token = JSON.parse(localStorage.getItem("token"));

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
        setDataPostIdReplies(res.data.idReplies);
        console.log("resMainPostinnerpost", res.data.idReplies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container_post_reply_innerpost">
        <div>
          <Mainpost idPost={idPost} />
        </div>

        <div className="container_reply_innerpost">
          {dataPostIdReplies.length !== 0 ? (
            <ul>
              {dataPostIdReplies.map((dataPostIdReplies) => (
                <Reply key={dataPostIdReplies} idReply={dataPostIdReplies} />
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Innerpost;
