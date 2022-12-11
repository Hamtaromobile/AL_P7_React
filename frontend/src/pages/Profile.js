import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import axios from "axios";
import UploadingProf from "../components/UploadingProf";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Newprofile = () => {
  let params = new URL(document.location).searchParams;
  let idUser = params.get("id");
  const [dataUser, setDataUser] = useState([]);
  const urlGet = "http://localhost:3001/api/auth/getUser/";

  useEffect(() => {
    axios
      .get(urlGet + idUser)
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
      <Navigation idUser={idUser} />
      <div className="container_nav_back_profile">
        <NavLink className="nav_back_profile" to={`/Welcome?id=${idUser}`}>
          <ArrowBackOutlinedIcon
            className="icone_arrowback_profile"
            sx={{ fontSize: 35 }}
          />
        </NavLink>
      </div>
      <h1 className="tt_profile">Profile</h1>
      <div className="container_prof">
        <div className="container_profileimg">
          <Profileimg dataUser={dataUser} />
        </div>

        <div className="container_profileinfo">
          <Profileinfo id={idUser} />
          <div>
            <UploadingProf id={idUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newprofile;
