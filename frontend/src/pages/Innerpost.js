import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation2 from "../components/Navigation2";
import Mainpost from "../components/Mainpost";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Reply from "../components/Reply";
import { NavLink } from "react-router-dom";

const Innerpost = () => {
  const params = new URL(document.location).searchParams;
  const idPost = params.get("idP");
  const idUser = params.get("idU");
  const [dataPostIdReplies, setDataPostIdReplies] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const token2 = JSON.parse(localStorage.getItem("token2"));
  const [reply, setReply] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const [dataErrorReplyAxios, setDataErrorReplyAxios] = useState("");
  const [dataResReplyAxios, setDataResReplyAxios] = useState("");
  const [statusPostReply, setStatusPostReply] = useState("");
  const urlPostIdReplyPost = "http://localhost:3001/api/post/idReply/";
  const urlPostNbrReplyPost = "http://localhost:3001/api/post/replies/";
  const urlPostReply = "http://localhost:3001/api/reply/createReply";
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const [navBarBurger, setNavBarBurger] = useState(false);
  const dataChild = {
    setNavBarBurger: setNavBarBurger,
    idUser: { idUser },
  };
  const [statusPostIdReplyPost, setStatusPostIdReplyPost] = useState("");

  //Get data main post
  useEffect(() => {
    axios
      .get(urlGetPost + idPost, {
        headers: {
          authorization: `Bearer ${token}`,
          authorization2: `Bearer ${token2}`,
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

  const textOnChange = (e) => {
    setText(e.target.value);
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  //submit reply
  const handleReply = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", idUser);
    formData.append("text", text);
    formData.append("date", date);
    axios
      .post(urlPostReply, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          authorization2: `Bearer ${token2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setDataResReplyAxios(res.data);
        setStatusPostReply(res.status);
      })
      .catch((err) => {
        console.log(err);
        setDataErrorReplyAxios(err);
      });
  };

  //submit idRpley for MainPost
  useEffect(() => {
    if (statusPostReply === 201) {
      console.log("dataResReplyAxios.replyId", dataResReplyAxios.replyId);
      const dataIdReply = {
        idReplies: dataResReplyAxios.replyId,
      };
      axios
        .post(urlPostIdReplyPost + idPost, dataIdReply, {
          headers: {
            authorization: `Bearer ${token}`,
            authorization2: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setStatusPostIdReplyPost(res.status);
          console.log("pushidreply", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [statusPostReply === 201]);

  //submit nbre replies for MainPost
  useEffect(() => {
    if (statusPostIdReplyPost === 200) {
      alert("nbrrepliue");
      axios
        .post(urlPostNbrReplyPost + idPost)
        .then((res) => {
          console.log("pushNbrereply", res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [statusPostIdReplyPost === 200]);

  return (
    <div>
      {!navBarBurger ? (
        <div className="container_post_reply_innerpost">
          <div className="container_nav_back_innerpost">
            <NavLink className="nav_back_innerpost" to={`/Home?id=${idUser}`}>
              <ArrowBackOutlinedIcon
                className="icone_arrowback_innerpost"
                sx={{ fontSize: 35 }}
              />
            </NavLink>
          </div>
          <div>
            <Mainpost idPost={idPost} reply={reply} />
          </div>

          <div className="container_reply_innerpost">
            {dataPostIdReplies.length !== 0 ? (
              <ul>
                {dataPostIdReplies.map((dataPostIdReplies) => (
                  <Reply
                    key={dataPostIdReplies}
                    reply={reply}
                    idReply={dataPostIdReplies}
                  />
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
          {reply ? (
            <div className="col-md-12 ">
              <h2 className="item_tt_reply">Reply</h2>
              <textarea
                className="item_txt_area_reply_innerpost"
                autoFocus
                value={text}
                onChange={(e) => textOnChange(e)}
              >
                texte
              </textarea>
              <div className="container_btn_reply_innerpost">
                <div>
                  <button
                    type="button"
                    onClick={() => setReply(false)}
                    className="btn btn-secondary item_btn"
                  >
                    cancel
                  </button>
                </div>
                <div>
                  <input
                    className="btn btn-light item_btn"
                    type="file"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={(e) => handleReply(e)}
                    className="btn btn-primary item_btn"
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setReply(true)}
              className="btn btn-success item_btn btn-lg btn-block"
            >
              reply
            </button>
          )}
          <p className="error_innerpost">{dataErrorReplyAxios}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Innerpost;
