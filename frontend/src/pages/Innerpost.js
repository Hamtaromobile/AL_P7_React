import React from "react";
import Navigation from "../components/Navigation";
import Mainpost from "../components/Mainpost";
import Responsepost from "../components/Responsepost";

const Innerpost = () => {
  return (
    <div>
      <Navigation />
      <div className="container_post_innerpost">
        <div>
          <Mainpost />
        </div>
      </div>
    </div>
  );
};

export default Innerpost;
