//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _commentApplicationService = require("../BLL/commentApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mComment = require('../models/comment');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'comment'
        module.exports.getCommentSchema = async () => {
            console.log("D.A.L [getCommentSchema] ()");

            //Initialisation de la variable de retour
            var commentSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mComment.schema.paths)) {
                commentSchema[key] = value.instance
                + " " 
                + ((value.options.required == true) ? "|R" : "")
                + ((value.options.unique == true) ? "|U" : "")
                + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
            }

            console.log("D.A.L [getCommentSchema] (return) 'comment-schema' : ",commentSchema);
            return commentSchema;
        };

        //Retourhe le schéma détaillé du model 'comment'
        module.exports.getDetailledCommentSchema = async () => {
            console.log("D.A.L [getDetailledCommentSchema] ()");

            //Initialisation de la variable de retour
            var commentDetailledSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mComment.schema.paths)) {
                commentDetailledSchema[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getDetailledCommentSchema] (return) 'detailled-comment-schema' : ",commentDetailledSchema);
            return commentDetailledSchema;
        };

    //#endregion
    
    //#region [QUERY DATA]

        //return body template for comments query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {}

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mComment.schema.paths)) {
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

        //return comments filtered by query
        module.exports.queryComments = async (query = {}) => {
            console.log("D.A.L [queryComments] (paramètres) 'query' : ",query);

            //TODO application service check query template
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                console.log("D.A.L [queryComments] (return) _getAllComments()");
                return this.getAllComments();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                
                try {
                    var data = await mComment.find().where(query);
                    var result = 
                    data ? {
                        comments:data,
                        count:data.length
                    } : {
                        message:"aucun utilisateur trouvé en base de données correspondant à la query"
                    };
                    console.log("D.A.L [queryComments] (return) result :", result);
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [queryComments] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
            }

            
                
            
        };

    //#endregion

    //#region [GET DATA]

        //return all comments
        module.exports.getAllComments = async () => {
            console.log("D.A.L [getAllComments] ()");
            try {
                var data = await mComment.find();
                return data 
                ? 
                    {
                        comments:data,
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

        //return Comment from provided ID
        module.exports.getCommentById = async (id) => {
            console.log("D.A.L [getCommentById] (paramètres) 'ID' :",id);
            try {
                var data = await mComment.findById(id);
                return data 
                ? 
                    data
                : 
                {
                    error:true,
                    message:"comment non-trouvé"
                };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error:error};
            }     
        };

    //#endregion

    //#region [CHECK DATA]

        //return Boolean representing existence of the provide comment id in database
        module.exports.checkCommentIdExistence = async (commentId) => {
            console.log("D.A.L [checkCommentIdExistence] (paramètres) 'commentId' : ",commentId);
            try {
                var result = await (mComment.findById(commentId)).count() > 0;
                console.log("D.A.L [checkCommentIdExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkCommentIdExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided commentName in database
        module.exports.checkCommentNameExistence = async (commentName) => {
            console.log("D.A.L [checkCommentNameExistence] (paramètres) 'commentName' :",commentName);
            console.log(await mComment.count({'commentName':{'$regex': '^'+commentName+'$',$options:'im'}}));
            try {
                var result = await mComment.count({'commentName':{'$regex': '^'+commentName+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkCommentNameExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkCommentNameExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
    module.exports.createComment = async (commentObject = null) => {
        console.log("D.A.L [createComment] (paramètres) 'commentObject' :",commentObject);

        if(commentObject == {} || commentObject == undefined || commentObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'comment\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {comment:{...comment informations...}}",
            })
        }
        
        try //Vérification de l'existence du nom du comment dans la base de données
        {   
            var commentNameAlreadyExist = await this.checkCommentNameExistence(commentObject.commentName);
            console.log("D.A.L [createComment] commentNameAlreadyExist :",commentNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createComment] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'comment : \'"+commentObject.commentName+"\' dans la base de données",
                exception:exception
            })
        }
        
        if(!commentNameAlreadyExist)
        {
            try //Création du modèle à partir des données du body de la requête
            {   
                var newComment = new mComment({ ...commentObject });
            }
            catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
            {   
                console.log("D.A.L [createComment] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la création du modèle pour le nouvel comment : \'"+commentObject.name+"\'",
                    commentInfoReceipted:commentObject,
                    exception:exception
                })
            }
        
            try //Sauvegarde du modèle Comment dans la BDD
            {   
                await (newComment.save());
            }
            catch (exception) //ECHEC Sauvegarde du modèle Comment dans la BDD
            {   
                console.log("D.A.L [createComment] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouveau comment : \'"+commentObject.commentName+"\'",
                    commentInfoReceipted:commentObject,
                    exception:exception
                })
            }
    
            console.log("D.A.L [createComment] (return) 'status' : SUCCESS");
            return ({
                status:"SUCCESS",
                statusCode:201,
                commentCreated:commentObject,
                message: "Utilisateur : \'"+commentObject.commentName+"\' Créé avec succès"
            });
        }
        else
        {
            var message = "";
            var nbFieldInError = 0;

            if(commentNameAlreadyExist) 
            {
                nbFieldInError++;
                message += "\'commentName\'";
            }

            message = nbFieldInError > 1 
            ? nbFieldInError+" fields values who needs to be uniques in database already exist : "+message 
            : "A field value who need to be unique in database already exist : "+message;

            console.log("D.A.L [createComment] (return) 'error' : duplicated-field");
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:commentObject,
                nbError:nbFieldInError,
                message:message
            });
        }

        
    };

    //Mets à jour le comment et renvoi le résultat de la mise à jour
    module.exports.updateComment = async (commentId,commentObject = null) => {
        console.log("D.A.L [updateComment] (paramètres) 'commentId' :",commentId,"'commentObject' :",commentObject);

        if(commentObject == {} || commentObject == undefined || commentObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'comment\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {comment:{...comment informations...}}",
            })
        }

        //Validation des données reçues
        var commentIdExist = await this.checkCommentIdExistence(commentId);

        //Si les deux données reçues sont valides 
        if(!commentIdExist)
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le comment : (ID)=\'"+commentId+"\' n'a pas été trouvé dans la base de données",
            })
        }

        try //Vérification de l'existence du nom de l'comment dans la base de données
        {   
            var commentNameAlreadyExist = await this.checkCommentNameExistence(commentObject.commentName);
            console.log("D.A.L [createComment] commentNameAlreadyExist :",commentNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createComment] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'comment : \'"+commentObject.commentName+"\' dans la base de données",
                exception:exception
            })
        }

        if(commentNameAlreadyExist){
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:commentObject,
                nbError:1,
                message:"A field value who need to be unique in database already exist : commentName"
            });
        }
    
        try 
        {
            await mComment.updateOne(
                {_id:commentId},
                commentObject
            )
            return({
                status:"SUCCESS",
                statusCode:201,
                message: "L'comment : (ID)=\'"+commentId+"\' a été mis à jour avec succès",
            })
        } 
        catch (exception) 
        {
            return({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la mise à jour de l'comment : (ID)=\'"+commentId+"\'",
                exception:exception
            })
        }

        //TODO: Vérifier que la mise à jour a bien fonctionnée
    };

    //Supprime un utilisateur et renvoi le résultat de la suppression
    module.exports.deleteComment = async (commentId) => {
        console.log("D.A.L [deleteComment] (paramètres) 'commentId' :",commentId);

        //Validation des données reçues
        var commentIdExist = await this.checkCommentIdExistence(commentId);

        //Si les deux données reçues sont valides 
        if(commentIdExist)
        {
            try 
            {
                await mComment.deleteOne(
                    {_id:commentId}
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "Le comment : (ID)=\'"+commentId+"\' a été supprimé avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la suppression du comment : (ID)=\'"+commentId+"\'",
                    exception:exception
                })
            }
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le comment : (ID)=\'"+commentId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

//#endregion