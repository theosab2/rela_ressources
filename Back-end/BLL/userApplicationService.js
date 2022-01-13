//Import du modèle relatif
const mUser = require('../models/user');

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
