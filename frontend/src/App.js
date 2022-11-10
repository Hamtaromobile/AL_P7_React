import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Innerpost from "./pages/Innerpost";
import Createpost from "./pages/Createpost";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Innerpost" element={<Innerpost />} />
        <Route path="/Createpost" element={<Createpost />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
