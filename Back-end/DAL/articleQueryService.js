//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");

//Prefix du logger
const queryServiceLogPrefix  = "    (article)       D.A.L ";


//Import du modèle relatif
const mArticle = require('../models/article');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]

        module.exports.getSchemaPath = async () => {
            console.log(queryServiceLogPrefix,"[getSchemaPath] ()");
            console.log(queryServiceLogPrefix,"[getSchemaPath] (return) schemaPath");
            return Object.entries(mArticle.schema.paths);
        };

    //#endregion
    
    //#region [QUERY DATA]

        
        //return articles filtered by query
        module.exports.query = async (query = {}) => {
            console.log("D.A.L [queryArticles] (paramètres) 'query' : ",query);            
            
            //On prend en compte la query transmise à l'API
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
                    console.log(queryServiceLogPrefix,"[query] (return) : ",data.length," element",data.length > 1 ?'s':'');
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [query] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
        };

    //#endregion

    //#region [GET DATA]

        //return all articles
        module.exports.getAll = async () => {
            console.log(queryServiceLogPrefix,"[getAllArticles] ()");
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
        module.exports.getById = async (id) => {
            console.log(queryServiceLogPrefix,"[getById] (paramètres) 'ID' :",id);
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

        //return Boolean representing existence of the provided articleTitle in database
        module.exports.checkArticleTitleExistence = async (articleTitle) => {
            console.log("D.A.L [checkArticleTitleExistence] (paramètres) 'articleTitle' :",articleTitle);
            try {
                var result = await mArticle.count({'articleTitle':{'$regex': '^'+articleTitle+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkArticleTitleExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkArticleTitleExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel article
    module.exports.saveOne = async (newArticleModel) => {
        try //Création du modèle à partir des données du body de la requête
        {
            console.log(queryServiceLogPrefix,"[create] (info) creating article object before database insertion");
            var newArticle = new mArticle({ ...newArticleModel });
        }
        catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
        {   
            console.log(queryServiceLogPrefix,"[create] (error) exception occur during article object creation : ",exception);
            return ({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newArticleModel.title+"\'",
                articleInfoReceipted:newArticleModel,
                exception:exception
            })
        }
    
        try //Création du modèle à partir des données du body de la requête
        {
            console.log(queryServiceLogPrefix,"[create] (info) saving created article object in database");
            await newArticle.save()
        }
        catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
        {   
            console.log(queryServiceLogPrefix,"[create] (error) exception occur during article object save in database : ",exception);
            return ({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newArticleModel.title+"\'",
                articleInfoReceipted:newArticleModel,
                exception:exception
            })
        }

        return ({
            status:"SUCCESS",
            statusCode:201,
            articleCreated:newArticleModel,
            message: "Article : \'"+newArticleModel.title+"\' Ajouté à la base de données avec succès"
        });
    }

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