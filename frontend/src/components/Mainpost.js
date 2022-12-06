import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Mainpost = ({ idPost }) => {
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const urlDeletePost = "http://localhost:3001/api/post/deletePost/";
  const urlPostPost = "http://localhost:3001/api/post/modifyPost/";
  const urlPostLikeDisPost = "http://localhost:3001/api/post/likeDislike/";
  const urlPostReply = "http://localhost:3001/api/reply/createReply";
  const urlPostIdReplyPost = "http://localhost:3001/api/post/idReply/";

  const token = JSON.parse(localStorage.getItem("token"));
  const [dataUser, setDataUser] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [statusGetPost, setStatusGetPost] = useState("");
  const [statusPostReply, setStatusPostReply] = useState("");
  const [file, setFile] = useState();
  const [dataResReplyAxios, setDataResReplyAxios] = useState("");
  let like;
  const tabUserLike = dataPost.usersLiked;
  const tabUserDisLike = dataPost.usersDisliked;
  const [likeHere, setLikeHere] = useState(false);
  const [disLikeHere, setDisLikeHere] = useState(false);
  const [reply, setReply] = useState(false);
  const [text, setText] = useState("");
  const [dataErrorAxios, setDataErrorReplyAxios] = useState("");
  const [dataErrorReplyAxios, setDataErrorAxios] = useState("");
  const params = new URL(document.location).searchParams;
  const idUserConnected = params.get("idU");

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
        console.log("resMainPost", res);
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
  }, [statusGetPost === 200]);

  //Get user data for main post
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
        window.location.href = "/Welcome" + "?id=" + dataPost.userId;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //submit change
  const handleSubmit = (event) => {
    event.preventDefault();

    const editDate = new Date().toLocaleString();
    const formData = new FormData();
    //keep data
    if (editTitle.length === 0) {
      formData.append("title", dataPost.title);
    } else {
      formData.append("title", editTitle);
    }
    if (editText.length === 0) {
      formData.append("text", dataPost.text);
    } else {
      formData.append("text", editText);
    }
    formData.append("image", file);
    formData.append("userId", dataPost.userId);
    formData.append("editDate", editDate);
    axios
      .put(urlPostPost + idPost, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);

        //- window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

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
        .post(urlPostLikeDisPost + idPost, dataLike, {
          headers: {
            authorization: `Bearer ${token}`,
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
      axios
        .post(urlPostLikeDisPost + idPost, dataLike, {
          headers: {
            authorization: `Bearer ${token}`,
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

  //submit reply
  const handleReply = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", idUserConnected);
    formData.append("text", text);
    formData.append("date", date);
    axios
      .post(urlPostReply, formData, {
        headers: {
          authorization: `Bearer ${token}`,
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
      const dataIdReply = {
        idReplies: dataResReplyAxios.replyId,
      };
      axios
        .post(urlPostIdReplyPost + idPost, dataIdReply, {
          headers: {
            authorization: `Bearer ${token}`,
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
  }, [statusPostReply === 201]);

  return (
    <article>
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
            {dataPost.editDate ? <em>édité le {dataPost.editDate}</em> : ""}
            {dataPost.imageUrl ? (
              <img
                src={dataPost.imageUrl}
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
                  defaultValue={editText ? editText : dataPost.text}
                  autoFocus
                  onChange={(e) => setEditText(e.target.value)}
                ></textarea>
              ) : (
                <p>{editText ? editText : dataPost.text}</p>
              )}
            </article>
            <div className="container_btn_like_dis">
              {editing || reply ? (
                ""
              ) : (
                <div className="container_like_dis">
                  <p className="item_nbr_like">{dataPost.likes}</p>
                  <span onClick={handleLike}>
                    <ThumbUpAltIcon
                      className="item_like"
                      sx={{ fontSize: 40 }}
                      style={{
                        color: likeHere ? "darkgreen" : "grey",
                      }}
                    />
                  </span>
                  <p className="item_nbr_dislike">{dataPost.dislikes}</p>
                  <span type="submit" onClick={handledisLike}>
                    <ThumbDownAltIcon
                      className="item_dislike"
                      sx={{ fontSize: 40 }}
                      style={{
                        color: disLikeHere ? "darkred" : "grey",
                      }}
                    />
                  </span>
                </div>
              )}

              <div className="container_button_mp">
                <div>
                  {editing || reply || dataPost.userId !== idUserConnected ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="btn btn-primary item_btn"
                    >
                      Edit
                    </button>
                  )}
                  {reply || editing ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReply(true)}
                      className="btn btn-success item_btn"
                    >
                      reply
                    </button>
                  )}

                  {editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-secondary item_btn"
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
                      className="btn btn-danger item_btn"
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
                      className="btn btn-success item_btn"
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
                      className="btn btn-light item_btn"
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
          <p className="err_send">{dataErrorReplyAxios}</p>
          {reply ? (
            <div class="col-md-12 ">
              <h2 className="item_tt_reply">Reply</h2>
              <textarea
                className="item_txt_area_reply"
                autoFocus
                value={text}
                onChange={(e) => textOnChange(e)}
              >
                texte
              </textarea>
              <div className="container_btn_reply">
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
            ""
          )}
        </div>
        <div className="err_send">{dataErrorAxios}</div>
      </div>
    </article>
  );
};

export default Mainpost;
