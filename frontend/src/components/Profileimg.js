import React from "react";

const Profileimg = () => {
  return (
    <div className="container_profileimg">
      <div className="card mb-4 mb-xl-0">
        <div className="card-header">Welcome Damien</div>
        <div className="card-body text-center">
          <div className="container-img">
            <img
              className="img-account-profile rounded-circle mb-2"
              src="http://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
            />
          </div>
          <p className="employment">Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default Profileimg;
