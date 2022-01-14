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

//TODO: Route connexion
//TODO: Route deconnexion

//===== Article =====//

//===== Category =====//

//===== Comment =====//

//===== User =====//

    //#region [GET]

        //Get user by ID
        router.get('/user/:id', async function(req, res, next){
            var data = await _userQueryService.getUserById(req.params.id);
            console.log("user-data awaited : \n",data);
            res.status(200).json({ user:data });
        });

    //#endregion

    //#region [POST]
        //TODO: post methods
    //#endregion

//===== Role =====//

module.exports = router;

