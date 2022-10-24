import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Profileinfo = ({ id }) => {
  let [firstName, setFirstName] = useState("");
  const [errorFn, setErrorFn] = useState(false);
  const [allowSendFn, setAllowSendFn] = useState(false);
  let [lastName, setLastName] = useState("");
  const [errorLn, setErrorLn] = useState(false);
  const [allowSendLn, setAllowSendLn] = useState(false);
  let [employment, setEmployment] = useState("");
  const [errorE, setErrorE] = useState(false);
  const [allowSendE, setAllowSendE] = useState(false);
  let [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [allowSendEmail, setAllowSendEmail] = useState(false);
  let [password, setPassword] = useState("");
  const [allowSendPassword, setAllowSendPassword] = useState(false);
  let [confirmPassword, setConfirmPassword] = useState("");
  const [allowSendConfirmPassword, setAllowSendConfirmPassword] =
    useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataResAxios, setDataResAxios] = useState("");
  const [newPassword, setNewPassword] = useState(false);
  const urlGet = "http://localhost:3001/api/auth/getUser/";
  const urlPut = "http://localhost:3001/api/auth/modifyUser/";
  console.log("id", id);

  console.log("fn", firstName);
  console.log("fnlenght", firstName.length);
  useEffect(() => {
    axios
      .get(urlGet + id)
      .then((res) => {
        setDataUser(res.data);
        console.log("res", res);
        console.log("dataUser", dataUser);
        console.log("dataUserfn", dataUser.firstName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //chgt page
  /* useEffect(() => {
    if (dataResAxios.status === 200) {
      window.location.href = `/Profile?id=${id}`; //!!pas de route / nom de page
    }
  }, [dataResAxios.status === 200]);*/
  useEffect(() => {
    if (
      confirmPassword.length > 0 &&
      password === confirmPassword &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        password
      )
    ) {
      setNewPassword(true);
    }
    console.log("newPassword", newPassword);
  }, [
    confirmPassword.length > 0 &&
      password === confirmPassword &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        password
      ),
  ]);

  const firstNameOnChange = (e) => {
    setFirstName(e.target.value);
    if (!/^[a-zA-Z ]+$/.test(e.target.value) || firstName.length > 40) {
      setErrorFn(true);
      setAllowSendFn(false);
    } else {
      setErrorFn(false);
      setAllowSendFn(true);
    }
  };

  const lastNameOnChange = (e) => {
    setLastName(e.target.value);
    if (!/^[a-zA-Z ]+$/.test(e.target.value) || lastName.length > 40) {
      setErrorLn(true);
      setAllowSendLn(false);
    } else {
      setErrorLn(false);
      setAllowSendLn(true);
    }
  };

  const employmentOnChange = (e) => {
    setEmployment(e.target.value);
    if (
      !/^[a-zA-Z\u0080-\u024F\s\-)(`."']+$/.test(e.target.value) ||
      employment.length > 40
    ) {
      setErrorE(true);
      setAllowSendE(false);
    } else {
      setErrorE(false);
      setAllowSendE(true);
    }
  };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value) ||
      firstName.length > 40
    ) {
      setErrorEmail(true);
      setAllowSendEmail(false);
    } else {
      setErrorEmail(false);
      setAllowSendEmail(true);
    }
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        e.target.value
      )
    ) {
      setAllowSendPassword(false);
    } else {
      setAllowSendPassword(true);
    }
  };

  const confirmPasswordOnChange = (e) => {
    setConfirmPassword(e.target.value);
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        password
      ) &&
      password !== e.target.value
    ) {
      setAllowSendConfirmPassword(false);
    } else {
      setAllowSendConfirmPassword(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstName.length === 0) {
      firstName = dataUser.firstName;
    }
    if (lastName.length === 0) {
      lastName = dataUser.lastName;
    }
    if (employment.length === 0) {
      employment = dataUser.employment;
    }
    if (email.length === 0) {
      email = dataUser.email;
    }
    if (
      confirmPassword.length === 0 ||
      password !== confirmPassword ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        password
      )
    ) {
      setNewPassword(false);
    }
    console.log("NewPassword", newPassword);
    if (newPassword === false) {
      const modifyData = {
        firstName,
        lastName,
        employment,
        email,
      };
      console.log("modifyData", modifyData);
      axios
        .put(urlPut + id, modifyData)
        .then((res) => {
          console.log(res);
          setDataResAxios(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const modifyDataP = {
        firstName,
        lastName,
        employment,
        email,
        password,
      };
      console.log("modifyData", modifyDataP);
      axios
        .put(urlPut + id, modifyDataP)
        .then((res) => {
          console.log(res);
          setDataResAxios(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section>
      <div className="col-xl-8">
        <div className="card mb-4">
          <div className="card-header">Account Details</div>
          <div className="card-body">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" for="firstName">
                    First name
                  </label>
                  <input
                    className="form-control"
                    id="firstName"
                    type="text"
                    placeholder={dataUser.firstName}
                    value={firstName}
                    onChange={(e) => firstNameOnChange(e)}
                  />
                </div>
                <div>
                  {errorFn && (
                    <Typography color="#FD2D01">
                      Veuillez écrire un Nom valide
                    </Typography>
                  )}
                </div>
                <div>
                  {firstName.length > 40 && (
                    <Typography color="#FD2D01">
                      Maximum de 40 caractère autorisé
                    </Typography>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" for="inputLastName">
                    Last name
                  </label>
                  <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder={dataUser.lastName}
                    value={lastName}
                    onChange={(e) => lastNameOnChange(e)}
                  />
                </div>
                <div>
                  {errorLn && (
                    <Typography color="#FD2D01">
                      Veuillez écrire un Prénom valide
                    </Typography>
                  )}
                </div>

                <div>
                  {lastName.length > 40 && (
                    <Typography color="#FD2D01">
                      Maximum de 40 caractère autorisé
                    </Typography>
                  )}
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" for="inputEmpName">
                    Employement
                  </label>
                  <input
                    className="form-control"
                    id="inputEmpName"
                    type="text"
                    placeholder={dataUser.employment}
                    value={employment}
                    onChange={(e) => employmentOnChange(e)}
                  />
                </div>
                <div>
                  {errorE && (
                    <Typography color="#FD2D01">
                      Veuillez écrire un emploi valide
                    </Typography>
                  )}
                </div>
                <div>
                  {employment.length > 40 && (
                    <Typography color="#FD2D01">
                      Maximum de 40 caractère autorisé
                    </Typography>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="small mb-1" for="inputEmailAddress">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="inputEmailAddress"
                  type="email"
                  placeholder={dataUser.email}
                  value={email}
                  onChange={(e) => emailOnChange(e)}
                />
              </div>
              <div>
                {errorEmail && (
                  <Typography color="#FD2D01">
                    Veuillez écrire une adresse email valide
                  </Typography>
                )}
              </div>
              <div>
                {email.length > 40 && (
                  <Typography color="#FD2D01">
                    Maximum de 40 caractère autorisé
                  </Typography>
                )}
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label
                    type="password"
                    className="small mb-1"
                    for="inputNewPassword"
                    style={{
                      color:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
                          password
                        )
                          ? "green"
                          : "black",
                    }}
                  >
                    New Password
                  </label>
                  <input
                    className="form-control"
                    id="inputNewPassword"
                    type="tel"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => passwordOnChange(e)}
                  />
                </div>

                <div className="col-md-6">
                  <label
                    type="password"
                    className="small mb-1"
                    for="inputConfirmNewpassword"
                    style={{
                      color:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
                          password
                        ) && password === confirmPassword
                          ? "green"
                          : "black",
                    }}
                  >
                    Confirm New Password
                  </label>
                  <input
                    className="form-control"
                    id="inputConfirmNewpassword"
                    type="text"
                    name="ConfirmNewPassword"
                    placeholder="Confirm Your New Password"
                    value={confirmPassword}
                    onChange={(e) => confirmPasswordOnChange(e)}
                  />
                </div>
              </div>

              <button
                disabled={
                  !allowSendFn &&
                  !allowSendLn &&
                  !allowSendE &&
                  !allowSendEmail &&
                  (!allowSendConfirmPassword || !allowSendPassword)
                    ? true
                    : false
                }
                className="btn btn-primary"
                type="submit"
              >
                Save changes
              </button>
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profileinfo;
