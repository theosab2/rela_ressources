require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const $reqLogger = require('./MiddleWares/req-logger-config');

module.exports = function (app, server) {
  if(process.env.devMode == "true" && process.env.devMode != null && process.env.devMode != undefined)
  {
    setTimeout(() => {
      console.log("Attempting development database connexion...");
      mongoose
        .connect(
          `${process.env.DEV_DB_SERVICE}://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASS}@${process.env.DEV_DB_URL}?retryWrites=true&w=majority`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
        )
        .then(() => console.log("Development database connection : SUCCESS"))
        .catch((exception) => {
          console.log("Development database connection : FAILURE");
          console.log("Exception :", exception);
        });
    }, 100); //Timeout to log dev DB connection status after listened port's log
  }
  else
  {
    setTimeout(() => {
      console.log("Attempting database connexion...");
      mongoose
        .connect(
          `${process.env.DB_SERVICE}://${process.env.DB_ROOT_USER}:${process.env.DB_ROOT_PASS}@${process.env.DB_SERVICE_NAME}:${process.env.DB_PORT}?retryWrites=true&w=majority`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME
          }
        )
        .then(() => console.log("Database connection : SUCCESS"))
        .catch((exception) => {
          console.log("Database connection : FAILURE");
          console.log("Exception :", exception);
        });
    }, 100); //Timeout to log DB connection status after listened port's log
  }
  

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, user-upload-GUID"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
  });

  app.use(express.json());
  app.use($reqLogger);

  //=========//
  //   API   //
  //=========//

  //Déclaration du router pour l'API
  var router = require("./API/router");
  app.use(router);
  
  app.use('/article-image',express.static(path.join(__dirname,"Assets/Uploads/Image/Article")));
  app.use('/avatar-image',express.static(path.join(__dirname,"Assets/Uploads/Image/Avatar")));
  app.use('/content-medias',express.static(path.join(__dirname,"Assets/Uploads/Image/ContentMedias")));
  // Ajout 'uplaoded-pdf'
  // Ajout 'uploaded-video'

  //========//
  // SOCKET //
  //========//

  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  app.use(function (req, res, next) {
    req.io = io;
    next();
  });

  //'Connection' => Nouvelle connexion d'un utilisateur
  io.on("connection", (socket) => {
    console.log(`Connecté au client ${socket.id}`);
    io.emit("notification", { type: "new_user", data: socket.id });

    //===== Listeners =====
    // Listener sur la déconnexion
    socket.on("disconnect", () => {
      console.log(`user ${socket.id} disconnected`);
      io.emit("notification", { type: "removed_user", data: socket.id });
    });
    //===== Listeners fin =====
  });
};
