import { useState, useEffect } from "react";
import axios from "axios";

function App({ id }) {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  //send image
  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3001/api/post/createPost" + id;
    const formData = new FormData();
    formData.append("image", file);
    axios
      .put(url, formData)
      .then((response) => {})
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
