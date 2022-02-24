//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _roleApplicationService = require("../BLL/roleApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mRole = require('../models/role');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'role'
        module.exports.getRoleSchema = async () => {
            console.log("D.A.L [getRoleSchema] ()");

            //Initialisation de la variable de retour
            var roleSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mRole.schema.paths)) {
                roleSchema[key] = value.instance
                + " " 
                + ((value.options.required == true) ? "|R" : "")
                + ((value.options.unique == true) ? "|U" : "")
                + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
            }

            console.log("D.A.L [getRoleSchema] (return) 'role-schema' : ",roleSchema);
            return roleSchema;
        };

        //Retourhe le schéma détaillé du model 'role'
        module.exports.getDetailledRoleSchema = async () => {
            console.log("D.A.L [getDetailledRoleSchema] ()");

            //Initialisation de la variable de retour
            var roleDetailledSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mRole.schema.paths)) {
                roleDetailledSchema[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getDetailledRoleSchema] (return) 'detailled-role-schema' : ",roleDetailledSchema);
            return roleDetailledSchema;
        };

    //#endregion
    
    //#region [QUERY DATA]

        //return body template for roles query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {}

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mRole.schema.paths)) {
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

        //return roles filtered by query
        module.exports.queryRoles = async (query = {}) => {
            console.log("D.A.L [queryRoles] (paramètres) 'query' : ",query);

            //TODO application service check query template
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                console.log("D.A.L [queryRoles] (return) _getAllRoles()");
                return this.getAllRoles();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                
                try {
                    var data = await mRole.find().where(query);
                    var result = 
                    data ? {
                        roles:data,
                        count:data.length
                    } : {
                        message:"aucun utilisateur trouvé en base de données correspondant à la query"
                    };
                    console.log("D.A.L [queryRoles] (return) result :", result);
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [queryRoles] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
            }

            
                
            
        };

    //#endregion

    //#region [GET DATA]

        //return all roles
        module.exports.getAllRoles = async () => {
            console.log("D.A.L [getAllRoles] ()");
            try {
                var data = await mRole.find();
                return data 
                ? 
                    {
                        roles:data,
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

        //return Role from provided ID
        module.exports.getRoleById = async (id) => {
            console.log("D.A.L [getRoleById] (paramètres) 'ID' :",id);
            try {
                var data = await mRole.findById(id);
                return data 
                ? 
                    data
                : 
                {
                    error:true,
                    message:"role non-trouvé"
                };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error:error};
            }     
        };

    //#endregion

    //#region [CHECK DATA]

        //return Boolean representing existence of the provide role id in database
        module.exports.checkRoleIdExistence = async (roleId) => {
            console.log("D.A.L [checkRoleIdExistence] (paramètres) 'roleId' : ",roleId);
            try {
                var result = await (mRole.findById(roleId)).count() > 0;
                console.log("D.A.L [checkRoleIdExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkRoleIdExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided roleName in database
        module.exports.checkRoleNameExistence = async (roleName) => {
            console.log("D.A.L [checkRoleNameExistence] (paramètres) 'roleName' :",roleName);
            console.log(await mRole.count({'roleName':{'$regex': '^'+roleName+'$',$options:'im'}}));
            try {
                var result = await mRole.count({'roleName':{'$regex': '^'+roleName+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkRoleNameExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkRoleNameExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
    module.exports.createRole = async (roleObject = null) => {
        console.log("D.A.L [createRole] (paramètres) 'roleObject' :",roleObject);

        if(roleObject == {} || roleObject == undefined || roleObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'role\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {role:{...role informations...}}",
            })
        }
        
        try //Vérification de l'existence du nom du role dans la base de données
        {   
            var roleNameAlreadyExist = await this.checkRoleNameExistence(roleObject.roleName);
            console.log("D.A.L [createRole] roleNameAlreadyExist :",roleNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createRole] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'role : \'"+roleObject.roleName+"\' dans la base de données",
                exception:exception
            })
        }
        
        if(!roleNameAlreadyExist)
        {
            try //Création du modèle à partir des données du body de la requête
            {   
                var newRole = new mRole({ ...roleObject });
            }
            catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
            {   
                console.log("D.A.L [createRole] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la création du modèle pour le nouvel role : \'"+roleObject.name+"\'",
                    roleInfoReceipted:roleObject,
                    exception:exception
                })
            }
        
            try //Sauvegarde du modèle Role dans la BDD
            {   
                await (newRole.save());
            }
            catch (exception) //ECHEC Sauvegarde du modèle Role dans la BDD
            {   
                console.log("D.A.L [createRole] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouveau role : \'"+roleObject.roleName+"\'",
                    roleInfoReceipted:roleObject,
                    exception:exception
                })
            }
    
            console.log("D.A.L [createRole] (return) 'status' : SUCCESS");
            return ({
                status:"SUCCESS",
                statusCode:201,
                roleCreated:roleObject,
                message: "Utilisateur : \'"+roleObject.roleName+"\' Créé avec succès"
            });
        }
        else
        {
            var message = "";
            var nbFieldInError = 0;

            if(roleNameAlreadyExist) 
            {
                nbFieldInError++;
                message += "\'roleName\'";
            }

            message = nbFieldInError > 1 
            ? nbFieldInError+" fields values who needs to be uniques in database already exist : "+message 
            : "A field value who need to be unique in database already exist : "+message;

            console.log("D.A.L [createRole] (return) 'error' : duplicated-field");
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:roleObject,
                nbError:nbFieldInError,
                message:message
            });
        }

        
    };

    //Mets à jour le role et renvoi le résultat de la mise à jour
    module.exports.updateRole = async (roleId,roleObject = null) => {
        console.log("D.A.L [updateRole] (paramètres) 'roleId' :",roleId,"'roleObject' :",roleObject);

        if(roleObject == {} || roleObject == undefined || roleObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'role\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {role:{...role informations...}}",
            })
        }

        //Validation des données reçues
        var roleIdExist = await this.checkRoleIdExistence(roleId);

        //Si les deux données reçues sont valides 
        if(!roleIdExist)
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le role : (ID)=\'"+roleId+"\' n'a pas été trouvé dans la base de données",
            })
        }

        try //Vérification de l'existence du nom de l'role dans la base de données
        {   
            var roleNameAlreadyExist = await this.checkRoleNameExistence(roleObject.roleName);
            console.log("D.A.L [createRole] roleNameAlreadyExist :",roleNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createRole] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'role : \'"+roleObject.roleName+"\' dans la base de données",
                exception:exception
            })
        }

        if(roleNameAlreadyExist){
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:roleObject,
                nbError:1,
                message:"A field value who need to be unique in database already exist : roleName"
            });
        }
    
        try 
        {
            await mRole.updateOne(
                {_id:roleId},
                roleObject
            )
            return({
                status:"SUCCESS",
                statusCode:201,
                message: "L'role : (ID)=\'"+roleId+"\' a été mis à jour avec succès",
            })
        } 
        catch (exception) 
        {
            return({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la mise à jour de l'role : (ID)=\'"+roleId+"\'",
                exception:exception
            })
        }

        //TODO: Vérifier que la mise à jour a bien fonctionnée
    };

    //Supprime un utilisateur et renvoi le résultat de la suppression
    module.exports.deleteRole = async (roleId) => {
        console.log("D.A.L [deleteRole] (paramètres) 'roleId' :",roleId);

        //Validation des données reçues
        var roleIdExist = await this.checkRoleIdExistence(roleId);

        //Si les deux données reçues sont valides 
        if(roleIdExist)
        {
            try 
            {
                await mRole.deleteOne(
                    {_id:roleId}
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "Le role : (ID)=\'"+roleId+"\' a été supprimé avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la suppression du role : (ID)=\'"+roleId+"\'",
                    exception:exception
                })
            }
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le role : (ID)=\'"+roleId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

//#endregion