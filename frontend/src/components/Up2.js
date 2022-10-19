import React, { useState } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("file", file);
    const url = "http://localhost:3001/api/auth/modifyUser/" + id;
    const formData = new FormData();
    formData.append("image", file);
    //formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
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
