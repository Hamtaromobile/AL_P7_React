import { useState, useEffect } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [employment, setEmployment] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const urlGet = "http://localhost:3001/api/auth/getUser/";
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    axios
      .get(urlGet + id)
      .then((res) => {
        setDataUser(res.data);
        console.log("res", res);
        console.log("dataUserimg", dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("file", file);
    const url = "http://localhost:3001/api/auth/modifyUser/" + id;
    const formData = new FormData();
    const modifyData = {
      firstName,
      lastName,
      employment,
      email,
      password,
    };
    formData.append("image", file);
    //formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .put(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
