import { useState, useEffect } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();
  const [dataUser, setDataUser] = useState([]);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/getUser/" + id)
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
    const url = "http://localhost:3001/api/post/createPost" + id;
    const formData = new FormData();
    formData.append("image", file);
    axios
      .put(url, formData)
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
