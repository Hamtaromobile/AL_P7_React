import React from "react";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Mainpost from "../components/Mainpost";
import Responsepost from "../components/Responsepost";

const Innerpost = () => {
  const params = new URL(document.location).searchParams;
  const idPost = params.get("idP");
  const idUser = params.get("idU");
  console.log("idUserinner", idUser);

  return (
    <div>
      <Navigation />
      <div className="container_post_innerpost">
        <div>
          <Mainpost idPost={idPost} idUser={idUser} />
        </div>
      </div>
    </div>
  );
};

export default Innerpost;
