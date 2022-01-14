//Import du modèle relatif
const mUser = require('../models/user');

//Import D.A.L associée
const _userQueryService = require("../DAL/userQueryService");

//Import des services nécéssaires
const _typeValidationService = require("../BLL/global/typeValidationService");

//L'identifier d'un utilisateur peut être : le N° de téléphone, l'adresse e-mail ou le pseudo
//Cette fonction permet donc de reconnaitre quel est le type de l'identifier en paramètre
module.exports.detectIdentifierType = async (identifier) => {
    console.log("B.L.L [detectIdentifierType]");
    console.log("[detectIdentifierType] (paramètres) 'identifier' :",identifier);

    var isPhoneNumber = await _typeValidationService.isPhoneNumber(identifier);
    var isEmail = await _typeValidationService.isEmail(identifier);

    if(isPhoneNumber && !isEmail){ //Phone
        return {typeName:"Phone"}
    }
    if(isEmail && !isPhoneNumber){ //Email
        return {typeName:"Email"}
    }
    if(!isEmail && !isPhoneNumber){ //Username
        return {typeName:"Username"}
    }
};

//Prise en main d'une requête d'authentification
module.exports.handleAuthenticationRequest = async (identifier,passwordProvided) => {
    console.log("B.L.L [handleAuthenticationRequest]");
    console.log("[handleAuthenticationRequest] (paramètres) 'identifier' :",identifier,"passwordProvided :",passwordProvided);

    //Déclaration de la variable de retour et de sa structure
    var authenticationResult = {
        status:null,
        statusCode:null,
        message:null,
        user:{}
    }

    if(identifier == undefined || identifier == null || identifier == "")
    {
        return{
            status:"MISSING_ENTRY",
            statusCode:400,
            message:"Unable to handle authentication request : identifier is missing",
            user:{}
        }
    }

    if(passwordProvided == undefined || passwordProvided == null || passwordProvided == "")
    {
        return{
            status:"MISSING_ENTRY",
            statusCode:400,
            message:"Unable to handle authentication request : password is missing",
            user:{}
        } 
    }

    //Récupération du type d'identifiant entré
    var identifierType = await this.detectIdentifierType(identifier)

    //Récupération de l'id en fonction du type d'identifier reçu
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

    //Récupération de la validité du mot de passe entré pour l'utilisateur reconnu par l'identifier entré
    var passwordIsValid = await _userQueryService.checkPassword(userId,passwordProvided)
    
    if(passwordIsValid){ //Le mot de passe entré est correct
        //Retourne l'utilisateur connecté
        var userFromConnectionAttempt = await _userQueryService.connectUser(userId);
        authenticationResult = {
            status:"SUCCESS",
            statusCode:200,
            message:"User \'"+userFromConnectionAttempt.username+"\' successfully connected",
            user:userFromConnectionAttempt
        }
    }
    else{ //Le mot de passe entré n'est pas correct
        authenticationResult = {
            status:"FAILURE",
            statusCode:401,
            message:"Can't connect to user (id=\'"+userId+"\') : Invalid password",
            user:{}
        }
    }

    return authenticationResult;
};

