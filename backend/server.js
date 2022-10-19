//server node

const http = require("http"); //import package http de node
const app = require("./app"); // import app.js ds le mm dossier
require("dotenv").config();

//renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//port déclaré ou écoute sur le port 3000
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

// rapport d'erreurs possibles
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//création server express avec app
const server = http.createServer(app);

//retour des erreurs
server.on("error", errorHandler);
//retour du port
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
