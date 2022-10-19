import axios from "axios";

import React, { Component } from "react";

class Uploadimg extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    let id = this.props.id;
    console.log("id", id);
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    //formData.append(this.state.selectedFile, this.state.selectedFile.name);
    // Details of the uploaded file
    console.log("this.state.selectedFile", this.state.selectedFile);
    console.log("this.state.selectedFile.name", this.state.selectedFile.name);
    // Request made to the backend api
    // Send formData object
    let file = this.state.selectedFile;
    let fileName = this.state.selectedFile.name;

    const data = {
      file,
      fileName,
    };
    console.log("data", data);
    console.log("file", file);
    axios
      .put("http://localhost:3001/api/auth/modifyUser/" + id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h2>id {this.props.id}</h2>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Uploadimg;
