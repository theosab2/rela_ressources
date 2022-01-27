//===== DAL - QueryServices =====//
const _articleQueryService = require("../DAL/articleQueryService");
const _categoryQueryService = require("../DAL/categoryQueryService");
const _commentQueryService = require("../DAL/commentQueryService");
const _roleQueryService = require("../DAL/roleQueryService");
const _userQueryService = require("../DAL/userQueryService");
//===============================//

//===== BLL - QueryServices =====//
const _articleApplicationService = require("../BLL/articleApplicationService");
const _categoryApplicationService = require("../BLL/categoryApplicationService");
const _commentApplicationService = require("../BLL/commentApplicationService");
const _roleApplicationService = require("../BLL/roleApplicationService");
const _userApplicationService = require("../BLL/userApplicationService");
//===============================//

//===== Initialisation du router =====//
const express = require('express');
const router = express.Router();
//====================================//

//===== Global routes =====//
router.get('/test', (req, res, next) => {
    res.status(200).json({ message:"L'API à répondu correctement" });
});

//===== Inscription / Authentification / Déconnexion =====//

    //Inscription
    router.post('/auth/register', async function(req, res, next){
        var userCreationQueryResult = await _userQueryService.createUser(req.body.user)
        res.status(userCreationQueryResult.statusCode).json(userCreationQueryResult);
    });

    //Connexion
    router.post('/auth/login', async function(req, res, next){
        var authenticationResult = await _userApplicationService.handleAuthenticationRequest(req.body.identifier,req.body.password);
        res.status(authenticationResult.statusCode).json(authenticationResult);
    });

    //Déconnexion
    router.post('/auth/logout/:userId', async function(req, res, next){
        var logoutResult = await _userQueryService.disconnectUser(req.params.userId);
        res.status(logoutResult.statusCode).json(logoutResult);
    });

//===== Article =====//

//===== Category =====//

//===== Comment =====//

//===== User =====//

    //#region [QUERY]

        //Get query object template
        router.get('/users/query', async function(req, res, next){
            var data = await _userQueryService.getQueryTemplate();
            console.log("template awaited for query : \n",data);
            res.status(200).json(data);
        });

        //Get list of users from query in request body
        router.post('/users/query', async function(req, res, next){
            var data = await _userQueryService.queryUsers(req.body);
            //console.log("users awaited from query : \n",data);
            res.status(200).json(data);
        });

    //#endregion

    //#region [GET]

        //Get all users
        router.get('/users/all', async function(req, res, next){
            var data = await _userQueryService.getAllUsers();
            console.log("users awaited : \n",data);
            res.status(200).json(data);
        });


        //Get user by ID
        router.get('/user/:id', async function(req, res, next){
            var data = await _userQueryService.getUserById(req.params.id);
            console.log("user-data awaited : \n",data);
            res.status(200).json(data);
        });

    //#endregion

    //#region [POST]
        //TODO: post methods
    //#endregion

//===== Role =====//

module.exports = router;

