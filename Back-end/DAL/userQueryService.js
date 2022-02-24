//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _userApplicationService = require("../BLL/userApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mUser = require('../models/user');

//#region [GET RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'user'
        module.exports.getUserSchema = async () => {
            console.log("D.A.L [getUserSchema] ()");

            //Initialisation de la variable de retour
            var userSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mUser.schema.paths)) {
                userSchema[key] = value.instance
                + " "
                + ((value.options.required == true) ? "|R" : "")
                + ((value.options.unique == true) ? "|U" : "")
                + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
            }

            console.log("D.A.L [getUserSchema] (return) 'user-schema' : ",userSchema);
            return userSchema;
        };

        //Retourhe le schéma détaillé du model 'user'
        module.exports.getDetailledUserSchema = async () => {
            console.log("D.A.L [getDetailledUserSchema] ()");

            //Initialisation de la variable de retour
            var userDetailledSchema = {};

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mUser.schema.paths)) {
                userDetailledSchema[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getDetailledUserSchema] (return) 'detailled-user-schema' : ",userDetailledSchema);
            return userDetailledSchema;
        };

    //#endregion
    
    //#region [QUERY]

        //return body template for users query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {}

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mUser.schema.paths)) {
                template[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getQueryTemplate] (return) query-template : ",template);
            return template;
        };

        //return users filtered by query
        module.exports.queryUsers = async (query = {}) => {
            console.log("D.A.L [queryUsers] (paramètres) 'query' : ",query);

            //TODO application service check query template
            
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                console.log("D.A.L [queryUsers] (return) _getAllUsers()");
                return this.getAllUsers();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                
                try {
                    var data = await mUser.find().where(query);
                    var result = 
                    data ? {
                        users:data,
                        count:data.length
                    } : {
                        message:"aucun utilisateur trouvé en base de données correspondant à la query"
                    };
                    console.log("D.A.L [queryUsers] (return) result :", result);
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [queryUsers] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
            }

            
                
            
        };

    //#endregion

    //#region [GET]

        //return all users
        module.exports.getAllUsers = async () => {
            console.log("D.A.L [getAllUsers] ()");
            try {
                var data = await mUser.find();
                return data 
                ? 
                    {
                        users:data,
                        count:data.length
                    } 
                : 
                    {
                        message:"aucun utilisateur enregistré en base de données"
                    };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error};
            }     
        };

        //return User from provided ID
        module.exports.getUserById = async (id) => {
            console.log("D.A.L [getUserById]");
            console.log("[getUserById] (paramètres) 'ID' :",id);
            try {
                var data = await mUser.findById(id);
                return data 
                ? 
                    data
                : 
                {
                    error:true,
                    message:"utilisateur non-trouvé"
                };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error:error};
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

    //#endregion

    //#region [CHECK]

        //return Boolean representing existence of the provided username in database
        module.exports.checkUserIdExistence = async (userId) => {
            console.log("D.A.L [checkUserIdExistence] (paramètres) 'userId' : ",userId);
            try {
                var result = await (mUser.findById(userId)).count() > 0;
                console.log("D.A.L [checkUserIdExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkUserIdExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided username in database
        module.exports.checkUsernameExistence = async (username) => {
            console.log("D.A.L [checkUsernameExistence] (paramètres) 'username' :",username);
            try {
                var result = await mUser.count({'username':{'$regex': '^'+username+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkUsernameExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkUsernameExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided username in database
        module.exports.checkPhoneExistence = async (phone) => {
            console.log("D.A.L [checkPhoneExistence] (paramètres) 'phone' :",phone);
            try {
                var result = await mUser.count({'phone':{'$regex': '^'+phone+'$',$options:'im'}}) > 0;
                console.log("D.A.L [checkPhoneExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkPhoneExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided username in database
        module.exports.checkEmailExistence = async (email) => {
            console.log("D.A.L [checkEmailExistence] (paramètres) 'email' :",email);
            try {
                var result = await mUser.count({'email':{'$regex': '^'+email+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkEmailExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkEmailExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the combination userId <-> password in database
        module.exports.checkPassword = async (userId,passwordProvided) => {
            console.log("D.A.L [checkPassword] (paramètres) 'userId' :",userId,'passwordProvided',passwordProvided);

            try {
                var checkResult = ((await mUser.count({_id:userId,password:passwordProvided})) > 0);
                console.log("D.A.L [checkPassword] (return) 'checkResult' : ",checkResult);
                return checkResult
            } 
            catch (error) {
                console.log("D.A.L [checkPassword] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
    module.exports.createUser = async (userObject) => {
        console.log("D.A.L [createUser] (paramètres) 'userObject' :",userObject);

        if(userObject == {} || userObject == undefined || userObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'user\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {user:{...user informations...}}",
            })
        }

        try //Vérification de l'existence du nom d'utilisateur dans la base de données
        {   
            var usernameAlreadyExist = await this.checkUsernameExistence(userObject.username);
            console.log("D.A.L [createUser] usernameAlreadyExist :",usernameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createUser] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom d'utilisateur : \'"+userObject.username+"\' dans la base de données",
                exception:exception
            })
        }

        try //Vérification du format de l'adresse email reçue
        {   
            var emailIsValid = await _typeValidationService.isEmail(userObject.email)
            console.log("D.A.L [createUser] emailIsValid :",emailIsValid);

            if(!emailIsValid){ //Le format de l'adresse email reçue n'est pas valide
                return({
                    status:"FAILURE",
                    statusCode:500,
                    message: "Le format de l'adresse email reçue : \'"+userObject.email+"\' est invalide",
                    userInfoReceipted:userObject,
                    exception:exception
                })
            }

        }
        catch(exception) //ECHEC de la vérification du format de l'adresse email reçue
        {   
            console.log("D.A.L [createUser] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification du format de l'adresse email : \'"+userObject.email+"\'",
                userInfoReceipted:userObject,
                exception:exception
            })
        }

        

        try //Vérification de l'existence de l'adresse email dans la base de données
        {   
            var emailAlreadyExist = await this.checkEmailExistence(userObject.email)
        }
        catch(exception) //ECHEC de la vérification de l'existence de l'adresse email dans la base de données
        {   
            console.log(exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence de l'adresse email : \'"+userObject.email+"\' dans la base de données",
                userInfoReceipted:userObject,
                exception:exception
            })
        }

        try //Vérification du format du n° de téléphone reçu
        {   
            var phoneIsValid = await _typeValidationService.isPhoneNumber(userObject.phone)

            if(!phoneIsValid){ //Le format du n° de téléphone n'est pas valide
                return({
                    status:"FAILURE",
                    statusCode:500,
                    message: "Le format du numéro de téléphone reçu : \'"+userObject.phone+"\' est invalide",
                    userInfoReceipted:userObject
                })
            }
        }
        catch(exception) //ECHEC de la vérification du format du n° de téléphone reçu
        {   
            console.log(exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification du format du n° de téléphone : \'"+userObject.phone+"\'",
                userInfoReceipted:userObject,
                exception:exception
            })
        }

        

        try //Vérification de l'existence du numéro de téléphone dans la base de données
        {   
            var phoneAlreadyExist = await this.checkPhoneExistence(userObject.phone)
        }
        catch(exception) //ECHEC de la vérification de l'existence du numéro de téléphone dans la base de données
        {   
            console.log(exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du numéro de téléphone : \'"+userObject.phone+"\' dans la base de données",
                userInfoReceipted:userObject,
                exception:exception
            })
        }

        if (!usernameAlreadyExist && !emailAlreadyExist && !phoneAlreadyExist) //Le nom d'utilisateur, l'adresse email et le n° de téléphone n'existent pas encore dans la base de données
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
                    userInfoReceipted:userObject,
                    exception:exception
                })
            }

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
                    userInfoReceipted:userObject,
                    exception:exception
                })
            }

            try //Nouvelle vérification de l'existence du nom d'utilisateur dans la base de données
            {   
                var usernameNowExist = await this.checkUsernameExistence(userObject.username)
            }
            catch(exception) //ECHEC de la nouvelle vérification de l'existence du nom d'utilisateur dans la base de données
            {   
                return({
                    status:"CONTROL_FAILURE",
                    statusCode:500,
                    message: "Une erreur est survenue durant la vérification de l'existence du nom d'utilisateur : \'"+userObject.username+"\' dans la base de données après sa création",
                    userInfoReceipted:userObject,
                    exception:exception
                })
            }

            if(usernameNowExist) //Le nom d'utilisateur est désormais dans la base de données (La création du nouvel utilisateur s'est déroulée avec succès)
            {   
                return ({
                    status:"SUCCESS",
                    statusCode:201,
                    userCreated:userObject,
                    message: "Utilisateur : \'"+userObject.username+"\' Créé avec succès"
                });
            }
            else //Le nom d'utilisateur n'a pas été trouvé dans la BDD
            {   
                return ({
                    status:"CANNOT_CONFIRM",
                    statusCode:202,
                    userInfoReceipted:userObject,
                    message: "L'enregistrement semble s'être correctement déroulé mais le nouvel utilisateur : \'"+userObject.username+"\' n'a pas été trouvé dans la base de données après son enregistrement"
                });
            } 
        } 
        else //Le nom d'utilisateur ET/OU l'email ET/OU le n° de téléphone existent déjà dans la base de données
        { //Ces contrôles sont séparé des autres plus haut puisqu'il permettent de générer un message signalant conbien de champs unique sont dupliqués dans la requête
            var message = "";
            var nbFieldInError = 0;

            if(usernameAlreadyExist) 
            {
                nbFieldInError++;
                message += "\'username\'";
            }
            if(emailAlreadyExist)
            {
                message += nbFieldInError > 0 ? ", " : "";
                nbFieldInError++;
                message += "\'email\'";
            }
            if(phoneAlreadyExist)
            {
                message += nbFieldInError > 0 ? ", " : "";
                nbFieldInError++;
                message += "\'phone\'";
            }

            message = nbFieldInError > 1 
            ? nbFieldInError+" fields values who needs to be uniques in database already exist : "+message 
            : "A field value who need to be unique in database already exist : "+message;

            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:userObject,
                nbError:nbFieldInError,
                message:message
            });
        } 
    };
    //Mets à jour l'utilisateur et renvoi le résultat de la mise à jour
    module.exports.updateUser = async (userId,userObject = {}) => {
        console.log("D.A.L [updateUser] (paramètres) 'userId' :",userId,"'userObject' :",userObject);

        if(userObject == {} || userObject == undefined || userObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'user\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {user:{...user informations...}}",
                exception:exception
            })
        }

        //Validation des données reçues
        var userIdExist = await this.checkUserIdExistence(userId);
        var usernameExist = await this.checkUsernameExistence(userObject.username);

        if(usernameExist)
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le nom d'utilisateur reçu : '"+userObject.username+"' existe déjà dans la base de données",
            })
        }

        //Si les deux données reçues sont valides 
        if(userIdExist)
        {
            try 
            {
                await mUser.updateOne(
                    {_id:userId},
                    userObject
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "L'utilisateur : (ID)=\'"+userId+"\' a été mis à jour avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la mise à jour de l'utilisateur : (ID)=\'"+userId+"\'",
                    exception:exception
                })
            }

            //TODO: Vérifier que la mise à jour a bien fonctionnée
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "L'utilisateur : (ID)=\'"+userId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

    //Supprime un utilisateur et renvoi le résultat de la suppression
    module.exports.deleteUser = async (userId) => {
        console.log("D.A.L [deleteUser] (paramètres) 'userId' :",userId);

        //Validation des données reçues
        var userIdExist = await this.checkUserIdExistence(userId);

        //Si les deux données reçues sont valides 
        if(userIdExist)
        {
            try 
            {
                await mUser.deleteOne(
                    {_id:userId}
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "L'utilisateur : (ID)=\'"+userId+"\' a été supprimé avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la suppression de l'utilisateur : (ID)=\'"+userId+"\'",
                    exception:exception
                })
            }
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "L'utilisateur : (ID)=\'"+userId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

    //Connecte l'utilisateur et le retourne:
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

    //Déconnecte l'utilisateur et retourne le résultat de la déconnexion:
    module.exports.disconnectUser = async (userId) => {
        console.log("D.A.L [disconnectUser]");
        console.log("[disconnectUser] (paramètres) 'userId' :",userId);

        var user = await this.getUserById(userId);
        console.log(user);
        
        if(user.username){
            if(user.isConnected == true){
                try {
                    await mUser.updateOne(
                        {_id:userId},
                        {isConnected:false}
                    )
                    return ({
                        status:"SUCCESS",
                        statusCode:201,
                        message: "La déconnexion de l'utilisateur : \'"+user.username+"\' s'est déroulée avec succès"
                    })
                } 
                catch (exception) 
                {
                    return ({
                        status:"EXCEPTION",
                        statusCode:500,
                        message: "Une erreur est survenue durant la déconnexion de l'utilisateur : \'"+user.username+"\'",
                        exception:exception
                    })
                }
            }
            else
            {
                return ({
                    status:"NO_CHANGE",
                    statusCode:200,
                    message: "L'utilisateur : \'"+user.username+"\' est déjà flaggé \'déconnecté\' dans la base de données",
                })
            }
        }
        else
        {
            return ({
                status:"EXCEPTION",
                statusCode:500,
                message: "L'utilisateur : (ID)=\'"+userId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

//#endregion