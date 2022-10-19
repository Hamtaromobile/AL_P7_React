import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import axios from "axios";
import Up2 from "../components/Up2";

const Newprofile = () => {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  const [dataUser, setDataUser] = useState([]);
  console.log("id", id);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/getUser/" + id)
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
      <Navigation />
      <div className="container_prof">
        <div>
          <div className="container_profileimg">
            <Profileimg dataUser={dataUser} />
          </div>
        </div>
        <div className="container_profileinfo">
          <Profileinfo id={id} />
        </div>
        <Up2 id={id} />
      </div>
    </div>
  );
};

export default Newprofile;
