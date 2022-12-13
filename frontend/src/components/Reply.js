import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Reply = ({ idReply }, { reply }) => {
  console.log("replyreplyreply", reply);

  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetReply = "http://localhost:3001/api/reply/getOneReply/";
  const urlDeleteReply = "http://localhost:3001/api/reply/deleteReply/";
  const urlPutReply = "http://localhost:3001/api/reply/modifyReply/";
  const urlPutLikeDisReply =
    "http://localhost:3001/api/reply/likeDislikeReply/";
  const urlPostIdReplyDeletePost = "http://localhost:3001/api/post/idReply/";
  const token = JSON.parse(localStorage.getItem("token"));
  const token2 = JSON.parse(localStorage.getItem("token2"));
  const [dataUser, setDataUser] = useState([]);
  const [dataReply, setDataReply] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [statusGetReply, setStatusGetReply] = useState("");
  const [file, setFile] = useState();
  const [dataResReplyAxios, setDataResReplyAxios] = useState("");
  let like;
  const tabUserLike = dataReply.usersLiked;
  const tabUserDisLike = dataReply.usersDisliked;
  const [likeHere, setLikeHere] = useState(false);
  const [disLikeHere, setDisLikeHere] = useState(false);
  //const [reply, setReply] = useState(false);
  const [text, setText] = useState("");
  const [dataErrorAxios, setDataErrorAxios] = useState("");
  const params = new URL(document.location).searchParams;
  const idUserConnected = params.get("idU");
  const idPost = params.get("idP");
  const [statusDeletedReplyAxios, setStatusDeletedReplyAxios] = useState("");
  const [UserConnected, setUserConnected] = useState("");

  //Get data reply
  useEffect(() => {
    axios
      .get(urlGetReply + idReply)
      .then((res) => {
        setDataReply(res.data);
        setStatusGetReply(res.status);
        console.log("resReply", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // présence like/dis pr couleurs icones
  useEffect(() => {
    if (tabUserLike !== undefined) {
      tabUserLike.includes(idUserConnected)
        ? setLikeHere(true)
        : setLikeHere(false);
    }
    if (tabUserDisLike !== undefined) {
      tabUserDisLike.includes(idUserConnected)
        ? setDisLikeHere(true)
        : setDisLikeHere(false);
    }
  }, [statusGetReply === 200]);

  //Get data user who created reply
  useEffect(() => {
    const getUserReq = async () => {
      try {
        const res = await axios.get(urlGetUser + dataReply.userId, {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setDataUser(res.data);
        // console.log("resUser", res);
      } catch (err) {
        console.log(err);
      }
    };
    getUserReq();
  }, [statusGetReply === 200]);

  //Get data user connected
  useEffect(() => {
    const getUserReq = async () => {
      try {
        const res = await axios.get(urlGetUser + idUserConnected, {
          headers: {
            authorization: `Bearer ${token}`,
            authorization2: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setUserConnected(res.data);
        console.log("setUserConnected(res.data);", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserReq();
  }, [statusGetReply === 200]);

  //Delete reply
  const handleDelete = () => {
    axios
      .delete(urlDeleteReply + idReply, {
        headers: {
          authorization: `Bearer ${token}`,
          authorization2: `Bearer ${token2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("resDeleteReply", res);
        setStatusDeletedReplyAxios(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete idReply for mainPost
  useEffect(() => {
    if (statusDeletedReplyAxios === 200) {
      const dataIdReplyDeleted = {
        idRepliesDeleted: idReply,
      };
      axios
        .post(urlPostIdReplyDeletePost + idPost, dataIdReplyDeleted, {
          headers: {
            authorization: `Bearer ${token}`,
            authorization2: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("pushidreply", res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [statusDeletedReplyAxios === 200]);

  //submit change
  const handleSubmit = (event) => {
    event.preventDefault();
    const editDate = new Date().toLocaleString();
    const formData = new FormData();
    //keep data
    if (editText.length === 0) {
      formData.append("text", dataReply.text);
    } else {
      formData.append("text", editText);
    }
    formData.append("image", file);
    formData.append("userId", dataReply.userId);
    formData.append("editDate", editDate);
    console.log("formData", formData);
    axios
      .put(urlPutReply + idReply, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          authorization2: `Bearer ${token2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  console.log("dataReply.userId", dataReply.userId);
  console.log("idUserConnected", idUserConnected);

  console.log("dataReply.usersLiked", dataReply.usersLiked);
  console.log("dataReply.usersDisLiked", dataReply.usersDisLiked);

  //submit like
  const handleLike = () => {
    if (tabUserDisLike.includes(idUserConnected)) {
      return 0;
    } else {
      if (tabUserLike.includes(idUserConnected)) {
        like = 0;
      } else {
        like = 1;
      }
      const dataLike = {
        like,
        userId: idUserConnected,
      };
      axios
        .post(urlPutLikeDisReply + idReply, dataLike, {
          headers: {
            authorization: `Bearer ${token}`,
            authorization2: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //submit dislike
  const handledisLike = () => {
    if (tabUserLike.includes(idUserConnected)) {
      return 0;
    } else {
      if (tabUserDisLike.includes(idUserConnected)) {
        like = 0;
      } else {
        like = -1;
      }
      const dataLike = {
        like,
        userId: idUserConnected,
      };
      console.log("dataLike,", dataLike);
      axios
        .post(urlPutLikeDisReply + idReply, dataLike, {
          headers: {
            authorization: `Bearer ${token}`,
            authorization2: `Bearer ${token2}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const textOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <article className="container_reply">
      <link
        href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <div className="container">
        <div id="blog" className="row">
          <div className="col-md-10 blogShort">
            <p>
              le {dataReply.date} par {dataUser.firstName} {dataUser.lastName}{" "}
            </p>
            {dataReply.editDate ? <em>édité le {dataReply.editDate}</em> : ""}
            {dataReply.imageUrl ? (
              <img
                src={dataReply.imageUrl}
                alt="post img"
                className="pull-left img-responsive thumb margin10 img-thumbnail"
              />
            ) : (
              ""
            )}
            <article>
              {editing ? (
                <textarea
                  className="txt_area_text"
                  defaultValue={editText ? editText : dataReply.text}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                ></textarea>
              ) : (
                <p>{editText ? editText : dataReply.text}</p>
              )}
            </article>
            <div className="container_btn_like_dis_reply">
              {editing || reply ? (
                ""
              ) : (
                <div className="container_like_dis_reply">
                  <p className="item_nbr_like_reply">{dataReply.likes}</p>
                  <span onClick={handleLike}>
                    <ThumbUpAltIcon
                      className="item_like_reply"
                      sx={{ fontSize: 40 }}
                      style={{
                        color: likeHere ? "darkgreen" : "grey",
                      }}
                    />
                  </span>
                  <p className="item_nbr_dislike_reply">{dataReply.dislikes}</p>
                  <span type="submit" onClick={handledisLike}>
                    <ThumbDownAltIcon
                      className="item_dislike_reply"
                      sx={{ fontSize: 40 }}
                      style={{
                        color: disLikeHere ? "darkred" : "grey",
                      }}
                    />
                  </span>
                </div>
              )}

              <div className="container_button_mp_reply">
                <div>
                  {!editing &&
                  !reply &&
                  (dataReply.userId === idUserConnected ||
                    UserConnected.isAdmin) ? (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="btn btn-primary item_btn_reply"
                    >
                      Edit
                    </button>
                  ) : (
                    ""
                  )}

                  {editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-secondary item_btn_reply"
                    >
                      cancel
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {editing ? (
                    <button
                      type="button"
                      className="btn btn-danger item_btn_reply"
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
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {editing ? (
                    <button
                      type="submit"
                      className="btn btn-success item_btn_reply"
                      onClick={handleSubmit}
                    >
                      confirm
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {editing ? (
                    <input
                      className="btn btn-light item_btn_reply"
                      type="file"
                      onChange={handleChange}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="err_send_reply">{dataErrorAxios}</div>
      </div>
    </article>
  );
};

export default Reply;
