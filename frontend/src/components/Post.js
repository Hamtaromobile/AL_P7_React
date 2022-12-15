import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useState, useEffect } from "react";

const Post = ({ dataPost }) => {
  const [dataUser, setDataUser] = useState("");
  const urlGetProf = "http://localhost:3001/api/auth/getUser/";
  const token = JSON.parse(localStorage.getItem("token"));

  //get data post
  useEffect(() => {
    axios
      .get(urlGetProf + dataPost.userId, {
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

  return (
    <section>
      <div className="container_post">
        <div className="container_logo_post">
          <img
            className="logo_post"
            src="/images/icon-left-font.png"
            alt="icone groupomania"
          />
        </div>
        <div className="container_tt_txt_post">
          <div className="container_tt_ico_post">
            <TableRowsIcon />
            <h2>{dataPost.title}</h2>
          </div>
          <div className="container_text_post">
            <p>{dataPost.text}</p>
          </div>
        </div>
        <div>
          <VisibilityIcon className="icon_visi_post" />
          {dataPost.views}
        </div>
        <div>
          <MessageIcon className="icon_mess_post" />
          {dataPost.replies}
        </div>
        <div className="container_auth_img_date_post">
          <p>
            {dataUser.firstName} {dataUser.lastName}
          </p>
          <div>
            <img
              className="item_img_post"
              src={dataUser.imageUrl !== undefined ? dataUser.imageUrl : ""}
              alt="Profil"
              style={{
                border:
                  dataUser.imageUrl !== undefined ? "1px  solid #FD2D01" : "",
              }}
            />
          </div>
          <div className="container_date">{dataPost.date}</div>
        </div>
      </div>
    </section>
  );
};

export default Post;
