//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _articleApplicationService = require("../BLL/articleApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mArticle = require('../models/article');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'article'
        module.exports.getArticleSchema = async () => {
            console.log("D.A.L [getArticleSchema] ()");

            //Initialisation de la variable de retour
            var articleSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mArticle.schema.paths)) {
                articleSchema[key] = value.instance
                + " " 
                + ((value.options.required == true) ? "|R" : "")
                + ((value.options.unique == true) ? "|U" : "")
                + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
            }

            console.log("D.A.L [getArticleSchema] (return) 'article-schema' : ",articleSchema);
            return articleSchema;
        };

        //Retourhe le schéma détaillé du model 'article'
        module.exports.getDetailledArticleSchema = async () => {
            console.log("D.A.L [getDetailledArticleSchema] ()");

            //Initialisation de la variable de retour
            var articleDetailledSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mArticle.schema.paths)) {
                articleDetailledSchema[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getDetailledArticleSchema] (return) 'detailled-article-schema' : ",articleDetailledSchema);
            return articleDetailledSchema;
        };

    //#endregion
    
    //#region [QUERY DATA]

        //return body template for articles query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {}

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mArticle.schema.paths)) {
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

        //return articles filtered by query
        module.exports.queryArticles = async (query = {}) => {
            console.log("D.A.L [queryArticles] (paramètres) 'query' : ",query);

            //TODO application service check query template
            
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                console.log("D.A.L [queryArticles] (return) _getAllArticles()");
                return this.getAllArticles();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                
                try {
                    var data = await mArticle.find().where(query);
                    var result = 
                    data ? {
                        articles:data,
                        count:data.length
                    } : {
                        message:"aucun utilisateur trouvé en base de données correspondant à la query"
                    };
                    console.log("D.A.L [queryArticles] (return) result :", result);
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [queryArticles] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
            }

            
                
            
        };

    //#endregion

    //#region [GET DATA]

        //return all articles
        module.exports.getAllArticles = async () => {
            console.log("D.A.L [getAllArticles] ()");
            try {
                var data = await mArticle.find();
                return data 
                ? 
                    {
                        articles:data,
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

        //return Article from provided ID
        module.exports.getArticleById = async (id) => {
            console.log("D.A.L [getArticleById] (paramètres) 'ID' :",id);
            try {
                var data = await mArticle.findById(id);
                return data 
                ? 
                    data
                : 
                {
                    error:true,
                    message:"article non-trouvé"
                };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error:error};
            }     
        };

    //#endregion

    //#region [CHECK DATA]

        //return Boolean representing existence of the provide article id in database
        module.exports.checkArticleIdExistence = async (articleId) => {
            console.log("D.A.L [checkArticleIdExistence] (paramètres) 'articleId' : ",articleId);
            try {
                var result = await (mArticle.findById(articleId)).count() > 0;
                console.log("D.A.L [checkArticleIdExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkArticleIdExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided articleName in database
        module.exports.checkArticleNameExistence = async (articleName) => {
            console.log("D.A.L [checkArticleNameExistence] (paramètres) 'articleName' :",articleName);
            console.log(await mArticle.count({'articleName':{'$regex': '^'+articleName+'$',$options:'im'}}));
            try {
                var result = await mArticle.count({'articleName':{'$regex': '^'+articleName+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkArticleNameExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkArticleNameExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
    module.exports.createArticle = async (articleObject = null) => {
        console.log("D.A.L [createArticle] (paramètres) 'articleObject' :",articleObject);

        if(articleObject == {} || articleObject == undefined || articleObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'article\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {article:{...article informations...}}",
            })
        }
        
        try //Vérification de l'existence du nom de l'article dans la base de données
        {   
            var articleNameAlreadyExist = await this.checkArticleNameExistence(articleObject.articleName);
            console.log("D.A.L [createArticle] articleNameAlreadyExist :",articleNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createArticle] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'article : \'"+articleObject.articleName+"\' dans la base de données",
                exception:exception
            })
        }
        
        if(!articleNameAlreadyExist)
        {
            try //Création du modèle à partir des données du body de la requête
            {   
                var newArticle = new mArticle({ ...articleObject });
            }
            catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
            {   
                console.log("D.A.L [createArticle] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+articleObject.name+"\'",
                    articleInfoReceipted:articleObject,
                    exception:exception
                })
            }
        
            try //Sauvegarde du modèle Article dans la BDD
            {   
                await (newArticle.save());
            }
            catch (exception) //ECHEC Sauvegarde du modèle Article dans la BDD
            {   
                console.log("D.A.L [createArticle] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouvel article : \'"+articleObject.articleName+"\'",
                    articleInfoReceipted:articleObject,
                    exception:exception
                })
            }
    
            console.log("D.A.L [createArticle] (return) 'status' : SUCCESS");
            return ({
                status:"SUCCESS",
                statusCode:201,
                articleCreated:articleObject,
                message: "Utilisateur : \'"+articleObject.articleName+"\' Créé avec succès"
            });
        }
        else
        {
            var message = "";
            var nbFieldInError = 0;

            if(articleNameAlreadyExist) 
            {
                nbFieldInError++;
                message += "\'articleName\'";
            }

            message = nbFieldInError > 1 
            ? nbFieldInError+" fields values who needs to be uniques in database already exist : "+message 
            : "A field value who need to be unique in database already exist : "+message;

            console.log("D.A.L [createArticle] (return) 'error' : duplicated-field");
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:articleObject,
                nbError:nbFieldInError,
                message:message
            });
        }

        
    };

    //Mets à jour l'article et renvoi le résultat de la mise à jour
    module.exports.updateArticle = async (articleId,articleObject = null) => {
        console.log("D.A.L [updateArticle] (paramètres) 'articleId' :",articleId,"'articleObject' :",articleObject);

        if(articleObject == {} || articleObject == undefined || articleObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'article\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {article:{...article informations...}}",
            })
        }

        //Validation des données reçues
        var articleIdExist = await this.checkArticleIdExistence(articleId);

        //Si les deux données reçues sont valides 
        if(!articleIdExist)
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "L'article : (ID)=\'"+articleId+"\' n'a pas été trouvé dans la base de données",
            })
        }

        try //Vérification de l'existence du nom de l'article dans la base de données
        {   
            var articleNameAlreadyExist = await this.checkArticleNameExistence(articleObject.articleName);
            console.log("D.A.L [createArticle] articleNameAlreadyExist :",articleNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createArticle] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'article : \'"+articleObject.articleName+"\' dans la base de données",
                exception:exception
            })
        }

        if(articleNameAlreadyExist){
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:articleObject,
                nbError:1,
                message:"A field value who need to be unique in database already exist : articleName"
            });
        }
    
        try 
        {
            await mArticle.updateOne(
                {_id:articleId},
                articleObject
            )
            return({
                status:"SUCCESS",
                statusCode:201,
                message: "L'article : (ID)=\'"+articleId+"\' a été mis à jour avec succès",
            })
        } 
        catch (exception) 
        {
            return({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la mise à jour de l'article : (ID)=\'"+articleId+"\'",
                exception:exception
            })
        }

        //TODO: Vérifier que la mise à jour a bien fonctionnée
    };

    //Supprime un utilisateur et renvoi le résultat de la suppression
    module.exports.deleteArticle = async (articleId) => {
        console.log("D.A.L [deleteArticle] (paramètres) 'articleId' :",articleId);

        //Validation des données reçues
        var articleIdExist = await this.checkArticleIdExistence(articleId);

        //Si les deux données reçues sont valides 
        if(articleIdExist)
        {
            try 
            {
                await mArticle.deleteOne(
                    {_id:articleId}
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "L'article : (ID)=\'"+articleId+"\' a été supprimé avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la suppression de l'article : (ID)=\'"+articleId+"\'",
                    exception:exception
                })
            }
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "L'article : (ID)=\'"+articleId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

//#endregion