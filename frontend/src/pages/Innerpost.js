import React from "react";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Mainpost from "../components/Mainpost";
import Responsepost from "../components/Responsepost";

const Innerpost = () => {
  let params = new URL(document.location).searchParams;
  let idPost = params.get("id");

  return (
    <div>
      <Navigation />
      <div className="container_post_innerpost">
        <div>
          <Mainpost idPost={idPost} />
        </div>
      </div>
    </div>
  );
};

export default Innerpost;
