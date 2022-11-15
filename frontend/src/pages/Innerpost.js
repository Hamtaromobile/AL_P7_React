import React from "react";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Mainpost from "../components/Mainpost";
import Responsepost from "../components/Responsepost";

const Innerpost = () => {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  
  return (
    <div>
      <Navigation id={id} />
      <div className="container_post_innerpost">
        <div>
          <Mainpost id={id} />
        </div>
      </div>
    </div>
  );
};

export default Innerpost;
