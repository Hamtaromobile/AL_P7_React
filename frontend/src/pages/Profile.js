import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import axios from "axios";
import UploadingProf from "../components/UploadingProf";

const Newprofile = () => {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  const [dataUser, setDataUser] = useState([]);
  const urlGet = "http://localhost:3001/api/auth/getUser/";
  console.log("id", id);
  useEffect(() => {
    axios
      .get(urlGet + id)
      .then((res) => {
        setDataUser(res.data);
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-body">
      <Navigation id={id} />
      <div className="container_prof">
        <div>
          <div className="container_profileimg">
            <Profileimg dataUser={dataUser} />
          </div>
        </div>
        <div className="container_profileinfo">
          <Profileinfo id={id} />
        </div>
        <UploadingProf id={id} />
      </div>
    </div>
  );
};

export default Newprofile;
