require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const sUser = require('./models/user');
const sAccount = require('./models/account');
// export one function that gets called once as the server is being initialized
module.exports = function (app, server) {
    let username = '';
    //Récupéré dans le cours
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('DB is OK'))
        .catch(() => console.log('DB failed'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST"]
        }
    })

    //require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.get('/test', (req, res, next) => {
        res.status(200).json({ hello: 'world' })
    })

    //Permet de créer un compte si le compte n'existe pas, ou de connecter la personne si le compte existe
    app.get('/auth/:username', (req, res, next) => {
        //console.log('Pseudo écrit : ' +req.params.username)
        sAccount.findOne({ username: req.params.username })
            .then(thing => {
                if (thing == null) {
                    console.log("L'utilisateur n'existe pas", req.params);
                    /*Problème résolu: Première insertion avec 'req.body' 
                    fonctionne mais ensuite ne passe plus, mettre req.params*/
                    const account = new sAccount({ ...req.params });
                    account.save().then(() => {
                        res.status(201).json({
                            info: 'Nouvel utilisateur enregistré',
                            username: req.params.username
                        })
                        sAccount.updateOne({ username: req.params.username }, { connected: true, lastConnection: Date.now() });
                        username = req.params.username;
                    }).catch((error) => {
                        //console.log(error);
                        res.status(400).json({ error })
                    })
                }
                else {
                    console.log('L\'utilisateur existe')
                    sAccount.updateOne({ username: req.params.username }, { connected: true, lastConnection: Date.now() }, {
                        returnNewDocument: true,
                        new: true,
                        strict: false
                    });
                    username = req.params.username;
                    res.status(200).json(thing);
                }
            })
            .catch(error => res.status(404).json({ error }));
    });
    //Je n'arrive pas a enregistrer de nouveau message dans mongoDB/ body parser à résolu le problème
    app.post('/sendMsg', (req, res, next) => {
        const user = new sUser({ ...req.body });
        user.save().then(() => {
            res.status(201).json({
                info: 'Nouveaux message de : ' + req.body.username,
            })
        }).catch((error) => {
            //console.log(error);
            res.status(400).json({ error })
        })
    });

    app.get('/msgByUser/:username', (req, res, next) => {
        sUser.count({ username: req.params.username })
            .then(data => {
                res.status(201).json({
                    count: data
                })

            })
    })

    /**
     * Partie socket
     */

    io.on('connection', (socket) => {
        console.log(`Connecté au client ${socket.id}`)
        io.emit('notification', { type: 'new_user', data: socket.id });

        // Listener sur la déconnexion
        socket.on('disconnect', () => {
            console.log(`user ${socket.id} disconnected`);
            io.emit('notification', { type: 'removed_user', data: socket.id });
        });
        //Besoin d'une fonction recursive pour trier les message dans l'autre, j'aurai du faire 2 model 16h29
        socket.on('command', (data) => {
            switch (data.command) {
                case 'refresh':
                    sUser.find({}, "username message")
                        .then(msgData => {
                            io.emit('dataMsg', { data: msgData });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(400).json({ error })
                        })
                case 'allUser':
                    sAccount.find({})
                        .then(username => {
                            io.emit('allUser', { username: username })
                        })
                case 'msgByUser':
                    break;
                default:
                    break;
            }

        });


    })
}