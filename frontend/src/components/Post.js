import axios from "axios";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TitleIcon from "@mui/icons-material/Title";
import { useState, useEffect } from "react";

const Post = ({ dataPost }) => {
  console.log("dataPostdataPost", dataPost);

  const [dataUser, setDataUser] = useState("");
  const urlGetProf = "http://localhost:3001/api/auth/getUser/";
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    console.log("dataPost.userId", dataPost.userId);
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
        console.log("resPost", res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <VisibilityIcon />
          {dataPost.views}
        </div>
        <div>
          <MessageIcon />
          {dataPost.replies}
        </div>
        <div className="container_auth_img_date_post">
          <p>
            {dataUser.firstName} {dataUser.lastName}
          </p>
          <div>
            <img
              className="item_img_post"
              src={dataUser.imageUrl != undefined ? dataUser.imageUrl : ""}
              alt="Photo de profil"
              style={{
                border:
                  dataUser.imageUrl != undefined ? "1px  solid #FD2D01" : "",
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
