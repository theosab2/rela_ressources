//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _userApplicationService = require("../BLL/userApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");

//Import du modèle relatif
const mUser = require('../models/user');

//#region [QUERY RESSOURCES]
    
    //#region [QUERY DATA]

        //return body template for users query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate]");
            console.log("[getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mUser.schema.paths)) {
                template[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            return template;
        };

        //return users filtered by query
        module.exports.queryUsers = async (query = {}) => {
            console.log("D.A.L [queryUsers]");
            console.log("[queryUsers] (paramètres) 'query' :",query);

            //TODO application service check query template
            
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                return this.getAllUsers();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                console.log("parsed query", parsedQuery);
                
                try {
                    var data = await mUser.find().where(query);
                    return data 
                    ?
                        {
                            users:data,
                            count:data.length
                        } 
                    : 
                        {
                            message:"aucun utilisateur trouvé en base de données correspondant à la query"
                        };
                } 
                catch (error) {
                    return {message:"une erreur est survenue",error};
                }  
            }

            
                
            
        };
    //#endregion

    //#region [GET DATA]

        //return all users
        module.exports.getAllUsers = async () => {
            console.log("D.A.L [getAllUsers]");
            console.log("[getAllUsers] ()");
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

    //#region [CHECK DATA]

        //return Boolean representing existence of the provided username in database
        module.exports.checkUserIdExistence = async (userId) => {
            console.log("D.A.L [checkUserIdExistence]");
            console.log("[checkUserIdExistence] (paramètres) 'userId' :",userId);
            try {
                var data = await (mUser.findById(userId)).count();
                console.log(data);
                return data > 0;
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
                var data = await mUser.count({'username':{'$regex': username,$options:'im'}});
                return data > 0;
            } 
            catch (error) {
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the conbination userId <-> password in database
        module.exports.checkPassword = async (userId,passwordProvided) => {
            console.log("D.A.L [checkPassword]");
            console.log("[checkPassword] (paramètres) 'userId' :",userId,'passwordProvided',passwordProvided);

            try {
                var checkResult = ((await mUser.count({_id:userId,password:passwordProvided})) > 0);
                return checkResult
            } 
            catch (error) {
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
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
                    message: "L'enregistrement semble s'être correctement déroulé mais le nouvel utilisateur : \'"+userObject.username+"\' n'a pas été trouvé dans la base de données après son enregistrement"
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

    //Déconnecte l'utilisateur et retourne:
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

    module.exports.updateUser = async (userId,userObject = {}) => {
        console.log("D.A.L [updateUser]");
        console.log("      [updateUser] (paramètres) 'userId' :",userId,"'userObject' :",userObject);

        if(userObject == {} || userObject == undefined || userObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'user\' introuvable dans le body de la requête",
                expected:"Format du body attendu : {user:{...}}",
                exception:exception
            })
        }

        //Récupération des in
        var userIdExist = await this.checkUserIdExistence(userId);
        console.log(userIdExist);

        //Si les deux noms d'utilisateur correspondent 
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

//#endregion