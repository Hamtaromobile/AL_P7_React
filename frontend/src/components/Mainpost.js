import React from "react";

const Mainpost = () => {
  return (
    <article className="container_mainpost">
      <div className="container_date_mainpost">
        <p>date</p>
      </div>
      <div className="container_memberpost_mainpost">
        <div className="container_member_mainpost">
          <p>name</p>
          <p>img</p>
          <p>inscrit en</p>
          <p>Message</p>
        </div>
        <div className="container_post_mainpost">
          <div>
            <h2 className="item_tt_mainpost">titre post</h2>
            <div className="borderbot_tt"></div>
            <div className="container_txtimg_mainpost">
              <p>text</p>
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
