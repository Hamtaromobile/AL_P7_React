import React from "react";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <h1>Bienvenue sur le réseau social de Groupomania</h1>
      <p>Présentez-vous !</p>
      <p>Echanger !</p>
      <p>Demander conseils !</p>
      <div className="container_img_home">
        <img src="./images/home.jpg" alt="home" />
      </div>
    </div>
  );
};

export default Home;
