import React, { useEffect, useState } from "react";
import Navigation2 from "../components/Navigation2";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import axios from "axios";
import UploadingProf from "../components/UploadingProf";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Newprofile = () => {
  let params = new URL(document.location).searchParams;
  const idUser = params.get("id");
  const [dataUser, setDataUser] = useState([]);
  const urlGet = "http://localhost:3001/api/auth/getUser/";
  const [navBarBurger, setNavBarBurger] = useState(false);
  const dataChild = {
    setNavBarBurger: setNavBarBurger,
    idUser: { idUser },
  };

  useEffect(() => {
    const idUserConnected = idUser;
    axios
      .get(urlGet + idUserConnected)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-body">
      <Navigation2 dataChild={dataChild} />
      <div className="container_nav_back_profile">
        <NavLink className="nav_back_profile" to={`/Home?id=${idUser}`}>
          <ArrowBackOutlinedIcon
            className="icone_arrowback_profile"
            sx={{ fontSize: 35 }}
          />
        </NavLink>
      </div>
      <h1 className="tt_profile">Profile</h1>
      <div className="container_prof">
        {!navBarBurger ? (
          <div className="container_profileimg">
            <Profileimg dataUser={dataUser} />
          </div>
        ) : (
          ""
        )}
        {!navBarBurger ? (
          <div className="container_profileinfo">
            <Profileinfo idUser={idUser} />
            <div>
              <UploadingProf id={idUser} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Newprofile;
