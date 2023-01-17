import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Reply = ({ dataReply, reply }) => {
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const urlDeleteReply = "http://localhost:3001/api/reply/deleteReply/";
  const urlPutReply = "http://localhost:3001/api/reply/modifyReply/";
  const urlPutLikeDisReply =
    "http://localhost:3001/api/reply/likeDislikeReply/";
  const token = JSON.parse(localStorage.getItem("token"));
  const token2 = JSON.parse(localStorage.getItem("token2"));
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [file, setFile] = useState();
  let like;
  const tabUserLike = dataReply.usersLiked;
  const tabUserDisLike = dataReply.usersDisliked;
  const [likeHere, setLikeHere] = useState(false);
  const [disLikeHere, setDisLikeHere] = useState(false);
  const [dataErrorAxios, setDataErrorAxios] = useState("");
  const params = new URL(document.location).searchParams;
  const idUserConnected = params.get("idU");
  const [UserConnected, setUserConnected] = useState("");
  const [loadColorOk, setloadColorOk] = useState(false);
  const [key, setKey] = useState("");
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
      } catch (err) {
        console.log(err);
      }
    };
    getUserReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Delete reply
  function handleDelete(dataReply) {
    axios
      .delete(urlDeleteReply + dataReply._id, {
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
        // setStatusDeletedReplyAxios(res.status);
      })
      .catch((err) => {
        setDataErrorAxios(err);
        console.log(err);
      });
  }

  //submit change
  const handleSubmit = (dataReply) => {
    console.log("dataReplysubmit", dataReply);
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
    axios
      .put(urlPutReply + dataReply._id, formData, {
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
        setDataErrorAxios(err);
      });
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  //submit like
  const handleLike = (dataReply) => {
    // const tabUserLike = dataReply.usersLiked;
    //const tabUserDisLike = dataReply.usersDisliked;
    if (dataReply.usersDisliked.includes(idUserConnected)) {
      return 0;
    } else {
      if (dataReply.usersLiked.includes(idUserConnected)) {
        like = 0;
      } else {
        like = 1;
      }
      const dataLike = {
        like,
        userId: idUserConnected,
      };
      axios
        .post(urlPutLikeDisReply + dataReply._id, dataLike, {
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
          setDataErrorAxios(err);
        });
    }
  };

  //submit dislike
  const handledisLike = (dataReply) => {
    const tabUserLike = dataReply.usersLiked;
    const tabUserDisLike = dataReply.usersDisliked;
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
        .post(urlPutLikeDisReply + dataReply._id, dataLike, {
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
          setDataErrorAxios(err);
        });
    }
  };

  const ThumbUpColor = (dataReply) => {
    alert("likeHere?");
    if (dataReply.usersLiked !== undefined) {
      dataReply.usersLiked.includes(idUserConnected)
        ? setLikeHere(true)
        : setLikeHere(false);
    }
  };

  /*// présence like/dis pr couleurs icones
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/
  /* console.log("tabUserLike", tabUserLike);
  console.log("tabUserDisLike", tabUserDisLike);
  console.log("idUserConnected", idUserConnected);
  console.log("likeHere", likeHere);
  console.log("disLikehere", disLikeHere);*/

  const colorLikeDislike = (dataReply) => {
    // alert("color");
    console.log("datareplydatareply", dataReply);
    if (dataReply.usersLiked !== undefined && loadColorOk === false) {
      //   alert("findLike");
      dataReply.usersLiked.includes(idUserConnected)
        ? setLikeHere(true)
        : setLikeHere(false);
      setloadColorOk(true);
    }
    if (dataReply.usersDisliked !== undefined && loadColorOk === false) {
      // alert("findDISLike");
      dataReply.usersDisliked.includes(idUserConnected)
        ? setDisLikeHere(true)
        : setDisLikeHere(false);
      setloadColorOk(true);
    }
  };

  console.log("likeHere", likeHere);
  console.log("disLikehere", disLikeHere);
  console.log("idUserConnected", idUserConnected);

  /* useEffect(() => {
    dataReply.map((dataReply) => colorLikeDislike(dataReply));
  }, []);*/

  let key2;
  const keyMap = (e) => {
    //setKey(e.currentTarget.getAttribute("key"));
    key2 = e.currentTarget.getAttribute("key");
    console.log("key2,", key2);
    alert(key2);
  };

  return (
    <ul className="reply">
      {dataReply.map((dataReply) => (
        <li
          key={dataReply._id}
          onLoad={() => {
            colorLikeDislike(dataReply);
            keyMap(dataReply._id);
          }}
        >
          <article className="container_reply">
            <link
              href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
              rel="stylesheet"
              id="bootstrap-css"
            />
            <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            <div className="container">
              <div className="row">
                <div className="col-md-10 blogShort">
                  <p>
                    le {dataReply.date} par {dataReply.userFirstName}{" "}
                    {dataReply.userLastName}{" "}
                  </p>
                  {dataReply.editDate ? (
                    <em>édité le {dataReply.editDate}</em>
                  ) : (
                    ""
                  )}
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
                      <label>
                        text
                        <textarea
                          className="txt_area_reply"
                          defaultValue={editText ? editText : dataReply.text}
                          autoFocus
                          onChange={(e) => setEditText(e.target.value)}
                        ></textarea>
                      </label>
                    ) : (
                      <p className="txt_reply">
                        {editText ? editText : dataReply.text}
                      </p>
                    )}
                  </article>
                  <div className="container_btn_like_dis_reply">
                    {editing || reply ? (
                      ""
                    ) : (
                      <div className="container_like_dis_reply">
                        <p className="item_nbr_like_reply">{dataReply.likes}</p>
                        <span
                          type="submit"
                          onClick={() => {
                            handleLike(dataReply);
                          }}
                        >
                          <ThumbUpAltIcon
                            className="item_like_reply"
                            sx={{ fontSize: 40 }}
                            style={{
                              color: likeHere ? "darkgreen" : "grey",
                            }}
                          />
                        </span>
                        <p className="item_nbr_dislike_reply">
                          {dataReply.dislikes}
                        </p>

                        <span
                          type="submit"
                          onClick={() => {
                            handledisLike(dataReply);
                          }}
                        >
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
                                handleDelete(dataReply);
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
                            onClick={() => {
                              handleSubmit(dataReply);
                            }}
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
        </li>
      ))}
    </ul>
  );
};

export default Reply;
