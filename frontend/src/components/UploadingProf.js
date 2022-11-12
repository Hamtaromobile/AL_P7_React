import { useState, useEffect } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [dataResAxios, setDataResAxios] = useState("");
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

  //chgt page
  useEffect(() => {
    if (dataResAxios.status === 200) {
      window.location.href = `/Profile?id=${id}`; //!!pas de route / nom de page
    }
  }, [dataResAxios.status === 200]);

  function handleSubmit(event) {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("file", file);
    const url = "http://localhost:3001/api/auth/modifyUser/" + id;
    const formData = new FormData();

    formData.append("image", file);

    axios
      .put(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response.data", response.data);
        setDataResAxios(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Image du profile</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
