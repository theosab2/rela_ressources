require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (app, server) {
    
    setTimeout(() => {console.log("Attempting database connexion...")
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Database connection : SUCCESS'))
        .catch((exception) => {console.log('Database connection : FAILURE');console.log('Exception :',exception);});
    }, 100); //Timeout to log DB connection status after listened port's log

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    //=========//
    //   API   //
    //=========//

    //Déclaration du router pour l'API
    var router = require("./API/router");
    app.use(router);

    //========//
    // SOCKET //
    //========//

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST"]
        }
    })

    app.use(function (req, res, next) { req.io = io; next(); });

    //'Connection' => Nouvelle connexion d'un utilisateur
    io.on('connection', (socket) => {
        console.log(`Connecté au client ${socket.id}`)
        io.emit('notification', { type: 'new_user', data: socket.id });

        //===== Listeners =====
            // Listener sur la déconnexion
            socket.on('disconnect', () => {
                console.log(`user ${socket.id} disconnected`);
                io.emit('notification', { type: 'removed_user', data: socket.id });
            });
        //===== Listeners fin =====

    })
}