//mongoose
const mongoose = require('mongoose');

//Import du modèle relatif
const mUser = require('../models/user');

//#region [Query ressources]

    //return User from provided ID
    module.exports.getUserById = async (id) => {
        console.log("D.A.L [getUserById]");
        console.log("[getUserById] (paramètres) 'ID' :",id);
        try {
            var data = await mUser.findById(id);
            return data ? data : {message:"utilisateur non-trouvé"};
        } 
        catch (error) {
            return {message:"une erreur est survenue",error};
        }     
    };

    //return UserId from provided email address
    module.exports.getUserIdFromEmail = async (email) => {
        console.log("D.A.L [getUserIdFromEmail]");
        console.log("[getUserIdFromEmail] (paramètres) 'email' :",email);
        try {
            email =  '^'+email+'$';
            var data = await mUser.findOne({'email':{'$regex': email,$options:'i'}});
            return data ? data._id : {message:"utilisateur non-trouvé"};
        } 
        catch (error) {
            return {message:"une erreur est survenue",error};
        }     
    };

    //return UserId from provided phone number
    module.exports.getUserIdFromPhone = async (phone) => {
        console.log("D.A.L [getUserIdFromPhone]");
        console.log("[getUserIdFromPhone] (paramètres) 'phone' :",phone);
        try {
            var data = await mUser.findOne({phone:phone});
            return data ? data._id : {message:"utilisateur non-trouvé"};
        } 
        catch (error) {
            return {message:"une erreur est survenue",error};
        }     
    };

    //return UserId from provided username
    module.exports.getUserIdFromUsername = async (username) => {
        console.log("D.A.L [getUserIdFromUsername]");
        console.log("[getUserIdFromUsername] (paramètres) 'username' :",username);
        try {
            username =  '^'+username+'$';
            var data = await mUser.findOne({'username':{'$regex': username,$options:'i'}});
            return data ? data._id : {message:"utilisateur non-trouvé"};
        } 
        catch (error) {
            return {message:"une erreur est survenue",error};
        }     
    };

    //return Boolean representing existence of the provided username in database
    module.exports.checkUsernameExistence = async (username) => {
        console.log("D.A.L [checkUsernameExistence]");
        console.log("[checkUsernameExistence] (paramètres) 'username' :",username);
        try {
            //Case-insensitive query
            username =  '^'+username+'$';
            var data = await mUser.count({'username':{'$regex': username,$options:'i'}});
            return data > 0;
        } 
        catch (error) {
            return error;
        }     
    };

    //return Boolean representing existence of the conbination userId in database
    module.exports.checkPassword = async (userId,passwordProvided) => {
        console.log("D.A.L [checkPassword]");
        console.log("[checkPassword] (paramètres) 'userId' :",userId,'passwordProvided',passwordProvided);

        try {
            var checkResult = ((await mUser.count({_id:userId,password:passwordProvided})) > 0);
            return checkResult
        } 
        catch (error) {
            return false;
        }     
    };

//#endregion

//#region [Update ressources]

    module.exports.createUser = async (userObject) => {
        console.log("D.A.L [createUser]");
        console.log("      [createUser] (paramètres) 'userObject' :",userObject);

        try //Vérification de l'existence du nom d'utilisateur dans la base de données
        {   
            var usernameAlreadyExist = await this.checkUsernameExistence(userObject.username)
        }
        catch(exception) //ECHEC Vérification de l'existence du nom d'utilisateur dans la base de données
        {   
            console.log(exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom d'utilisateur : \'"+userObject.username+"\' dans la base de données",
                exception:exception
            })
        }

        if (!usernameAlreadyExist) //Le nom d'utilisateur n'existe pas encore dans la base de données
        {   
            try //Création du modèle à partir des données du body de la requête
            {   
                var newUser = new mUser({ ...userObject });
            }
            catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
            {   
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la création du modèle pour le nouvel utilisateur : \'"+userObject.username+"\'",
                    exception:exception
                })
            }
            console.log(newUser);
            try //Sauvegarde du modèle User dans la BDD
            {   
                await (newUser.save());
            }
            catch (exception) //ECHEC Sauvegarde du modèle User dans la BDD
            {   
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouvel utilisateur : \'"+userObject.username+"\'",
                    exception:exception
                })
            }

            try //Nouvelle vérification de l'existence du nom d'utilisateur dans la base de données
            {   
                var usernameNowExist = await this.checkUsernameExistence(userObject.username)
            }
            catch(exception) //ECHEC Nouvelle vérification de l'existence du nom d'utilisateur dans la base de données
            {   
                return({
                    status:"CONTROL_FAILURE",
                    statusCode:500,
                    message: "Une erreur est survenue durant la vérification de l'existence du nom d'utilisateur : \'"+userObject.username+"\' dans la base de données après sa création",
                    exception:exception
                })
            }

            if(usernameNowExist) //Le nom d'utilisateur est désormais dans la base de données (La création du nouvel utilisateur s'est déroulée avec succès)
            {   
                return ({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "Utilisateur : \'"+userObject.username+"\' Créé avec succès"
                });
            }
            else //Le nom d'utilisateur n'a pas été trouvé dans la BDD
            {   
                return ({
                    status:"CANNOT_CONFIRM",
                    statusCode:202,
                    message: "Le nouvel utilisateur : \'"+userObject.username+"\' n'a pas été trouvé dans la base de données après sa création"
                });
            } 
        } 
        else //Le nom d'utilisateur existe déjà dans la base de données
        {
            return ({
                status:"FAILURE",
                statusCode:500,
                message: "Le nom d'utilisateur : \'"+userObject.username+"\' existe déjà dans la base de données"
            });
        } 
    };

    module.exports.connectUser = async (userId) => {
        console.log("D.A.L [connectUser]");
        console.log("[connectUser] (paramètres) 'userId' :",userId);
        
        await mUser.updateOne(
            {_id:userId},
            {isConnected:true}
        )

        var userConnected = await this.getUserById(userId);
        return userConnected
        
    };

//#endregion