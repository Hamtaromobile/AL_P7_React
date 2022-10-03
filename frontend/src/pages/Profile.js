import React from "react";
import Navigation from "../components/Navigation";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import Uploadimg from "../components/Uploadimg";

const Newprofile = () => {
  return (
    <div className="container-body">
      <Navigation />
      <div className="container_prof">
        <div>
          <div className="container_profileimg">
            <Profileimg />
          </div>
          <Uploadimg />
        </div>
        <div className="container_profileinfo">
          <Profileinfo />
        </div>
      </div>
    </div>
  );
};

export default Newprofile;
