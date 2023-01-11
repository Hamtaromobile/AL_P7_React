import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Mainpost from "../components/Mainpost";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Reply from "../components/Reply";
import { NavLink } from "react-router-dom";
import Navigation2 from "../components/Navigation2";
//import Pagination from "../components/Pagination";
import Pagination from "../components/Pagination";

const Innerpost = () => {
  const params = new URL(document.location).searchParams;
  const idPost = params.get("idP");
  const idUser = params.get("idU");
  // const [dataPostIdReplies, setDataPostIdReplies] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const token2 = JSON.parse(localStorage.getItem("token2"));
  const [reply, setReply] = useState(false);
  const [statusGetReply, setStatusGetReply] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const [dataErrorReplyAxios, setDataErrorReplyAxios] = useState("");
  const [dataReply, setDataReply] = useState([]);
  const [statusPostReply, setStatusPostReply] = useState("");
  const urlPostIdReplyPost = "http://localhost:3001/api/post/idReply/";
  const urlPostNbrReplyPost = "http://localhost:3001/api/post/replies/";
  const urlPostReply = "http://localhost:3001/api/reply/createReply";
  const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
  const urlGetAllReply = "http://localhost:3001/api/reply/getAllReply/";
  const urlGetUser = "http://localhost:3001/api/auth/getUser/";
  const [statusPostIdReplyPost, setStatusPostIdReplyPost] = useState("");
  const [dataPost, setDataPost] = useState([]);
  const [navBarBurger, setNavBarBurger] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const dataChild = {
    setNavBarBurger: setNavBarBurger,
    idUser: { idUser },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataReply.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        //setDataPostIdReplies(res.data.idReplies);
        setDataPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get data reply
  useEffect(() => {
    axios
      .get(urlGetAllReply + idPost)
      .then((res) => {
        setDataReply(res.data);
        setStatusGetReply(res.status);
        console.log("resreply", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Get user
  useEffect(() => {
    axios
      .get(urlGetUser + idUser, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    formData.append("idPost", idPost);
    formData.append("userFirstName", dataUser.firstName);
    formData.append("userLastName", dataUser.lastName);

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
        // DataResReplyAxios(res.data);
        setStatusPostReply(res.status);
      })
      .catch((err) => {
        console.log(err);
        setDataErrorReplyAxios(err);
      });
  };

  //load page
  useEffect(() => {
    if (statusPostReply === 201) {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPostReply === 201]);

  //submit idRpley for MainPost
  /* useEffect(() => {
    if (statusPostReply === 201) {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPostReply === 201]);

  //submit nbre replies for MainPost
  useEffect(() => {
    if (statusPostIdReplyPost === 200) {
      axios
        .post(urlPostNbrReplyPost + idPost)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPostIdReplyPost === 200]);*/

  return (
    <article>
      <Navigation2 dataChild={dataChild} />
      <div className="container_nav_back_innerpost">
        <NavLink className="nav_back_innerpost" to={`/Home?id=${idUser}`}>
          <ArrowBackOutlinedIcon
            className="icone_arrowback_innerpost"
            sx={{ fontSize: 35 }}
          />
        </NavLink>
        <h1 className="tt_Innerpost">{dataPost.title}</h1>
      </div>
      <div className="container_innerpost">
        {!navBarBurger ? (
          <div className="container_mainpost_innerpost">
            <Mainpost idPost={idPost} reply={reply} />
          </div>
        ) : (
          ""
        )}
        {!navBarBurger ? (
          <div>
            <div className="container_reply_innerpost">
              <Reply reply={reply} dataReply={currentPosts} />
            </div>
            <div className="container_pagination_innerpost">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={dataReply.length}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          ""
        )}
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
            className="btn_reply_innerpost"
          >
            reply
          </button>
        )}
        <p className="error_innerpost">{dataErrorReplyAxios}</p>
      </div>
    </article>
  );
};

export default Innerpost;
