import axios from "axios";
import React, { useState } from "react";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";

const Post = () => {
  return (
    <section>
      <div className="container_post">
        <div className="container_logo_post">
          <img
            className="logo_post"
            src="/images/icon-left-font-monochrome-black.png"
            alt="icon-left-font-monochrome-black.png"
          />
        </div>

        <div className="container_tt_txt_post">
          <div className="container_tt_ico_post">
            <FormatAlignCenterIcon />
            <h2>Titre</h2>
          </div>
          <div>
            <p>text</p>
          </div>
        </div>
        <VisibilityIcon />
        <div>
          <MessageIcon />
        </div>
        <div className="container_auth_img_post">
          <div>author</div>
          <div className="item_img_post">img</div>
        </div>
      </div>
    </section>
  );
};

export default Post;
