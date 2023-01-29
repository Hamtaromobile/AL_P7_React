import { useState, useEffect } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();

  const [dataResAxios, setDataResAxios] = useState("");
  const urlGet = "http://localhost:3001/api/auth/getUser/";
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    axios
      .get(urlGet + id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //chgt page
  useEffect(() => {
    if (dataResAxios.status === 200) {
      window.location.href = `/Profile?id=${id}`; //!!pas de route / nom de page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataResAxios.status === 200]);

  function handleSubmit(event) {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    //const token2 = JSON.parse(localStorage.getItem("token2"));
    const url = "http://localhost:3001/api/auth/modifyUser/" + id;
    const formData = new FormData();

    formData.append("image", file);

    axios
      .put(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
         // authorization2: `Bearer ${token2}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDataResAxios(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Image du profile</p>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
