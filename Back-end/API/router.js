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
router.get('/', (req, res, next) => {
    res.status(200).json({ message:"L'API à répondu correctement" });
});

//===== Inscription / Authentification / Déconnexion =====//

    //Inscription
    router.post('/auth/register', async function(req, res, next){
        var userCreationQueryResult = await _userQueryService.createUser(req.body.user)
        res.status(200).json(userCreationQueryResult);
    });

    //Connexion
    router.post('/auth/login/:identifier', async function(req, res, next){
        var authenticationResult = {
            status:null,
            message:null,
            user:null
        }
        var passwordProvided = req.body.password;
        var identifier = req.params.identifier;

        var identifierType = await _userApplicationService.detectIdentifierType(req.params.identifier)
        console.log("identifierType :",identifierType);

        switch (identifierType.typeName) {
            case "Email":
                var userId = await _userQueryService.getUserIdFromEmail(identifier)
            break;
            case "Phone":
                var userId = await _userQueryService.getUserIdFromPhone(identifier);
            break;
            case "Username":
                var userId = await _userQueryService.getUserIdFromUsername(identifier);
            break;
            default:
                var userId = null;
            break;
        }

        var passwordIsValid = await _userQueryService.checkPassword(userId,passwordProvided)
        console.log("passwordIsValid :",passwordIsValid)

        
        if(passwordIsValid){
            //Retourne l'utilisateur connecté
            var userFromConnectionAttempt = await _userQueryService.connectUser(userId);
            authenticationResult = {
                status:"SUCCESS",
                message:"User \'"+userFromConnectionAttempt.username+"\' successfully connected",
                user:userFromConnectionAttempt
            }
        }
        else{
            authenticationResult = {
                status:"FAILURE",
                message:"Can't connect to user (id=\'"+userId+"\') : Invalid password",
            }
        }

        res.status(200).json(authenticationResult);
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

