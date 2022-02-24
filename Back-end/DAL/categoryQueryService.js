//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée
const _categoryApplicationService = require("../BLL/categoryApplicationService");

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mCategory = require('../models/category');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'category'
        module.exports.getCategorySchema = async () => {
            console.log("D.A.L [getCategorySchema] ()");

            //Initialisation de la variable de retour
            var categorySchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mCategory.schema.paths)) {
                categorySchema[key] = value.instance
                + " " 
                + ((value.options.required == true) ? "|R" : "")
                + ((value.options.unique == true) ? "|U" : "")
                + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
            }

            console.log("D.A.L [getCategorySchema] (return) 'category-schema' : ",categorySchema);
            return categorySchema;
        };

        //Retourhe le schéma détaillé du model 'category'
        module.exports.getDetailledCategorySchema = async () => {
            console.log("D.A.L [getDetailledCategorySchema] ()");

            //Initialisation de la variable de retour
            var categoryDetailledSchema = {
                
            }

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mCategory.schema.paths)) {
                categoryDetailledSchema[key] = 
                    {
                        "type":value.instance,
                        "required":(value.options.required == true),
                        "unique":(value.options.unique == true)
                    };
            }

            console.log("D.A.L [getDetailledCategorySchema] (return) 'detailled-category-schema' : ",categoryDetailledSchema);
            return categoryDetailledSchema;
        };

    //#endregion
    
    //#region [QUERY DATA]

        //return body template for categories query
        module.exports.getQueryTemplate = async () => {
            console.log("D.A.L [getQueryTemplate] ()");

            //Initialisation de la variable de retour
            var template = {}

            //Remplissage de la variable de retour
            for (const [key, value] of Object.entries(mCategory.schema.paths)) {
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

        //return categories filtered by query
        module.exports.queryCategories = async (query = {}) => {
            console.log("D.A.L [queryCategories] (paramètres) 'query' : ",query);

            //TODO application service check query template
        
            if(query === {})
            {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
                console.log("D.A.L [queryCategories] (return) _getAllCategories()");
                return this.getAllCategories();
            }
            else
            {   //On prend en compte la query transmise à l'API
                parsedQuery = await _queryParserService.parseObjectQuery(query);
                
                try {
                    var data = await mCategory.find().where(query);
                    var result = 
                    data ? {
                        categories:data,
                        count:data.length
                    } : {
                        message:"aucun utilisateur trouvé en base de données correspondant à la query"
                    };
                    console.log("D.A.L [queryCategories] (return) result :", result);
                    return result 
                    
                } 
                catch (error) {
                    console.log("D.A.L [queryCategories] (return) :", {message:"une erreur est survenue",error});
                    return {message:"une erreur est survenue",error};
                }   
            }

            
                
            
        };

    //#endregion

    //#region [GET DATA]

        //return all categories
        module.exports.getAllCategories = async () => {
            console.log("D.A.L [getAllCategories] ()");
            try {
                var data = await mCategory.find();
                return data 
                ? 
                    {
                        categories:data,
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

        //return Category from provided ID
        module.exports.getCategoryById = async (id) => {
            console.log("D.A.L [getCategoryById] (paramètres) 'ID' :",id);
            try {
                var data = await mCategory.findById(id);
                return data 
                ? 
                    data
                : 
                {
                    error:true,
                    message:"category non-trouvé"
                };
            } 
            catch (error) {
                return {message:"une erreur est survenue",error:error};
            }     
        };

    //#endregion

    //#region [CHECK DATA]

        //return Boolean representing existence of the provide category id in database
        module.exports.checkCategoryIdExistence = async (categoryId) => {
            console.log("D.A.L [checkCategoryIdExistence] (paramètres) 'categoryId' : ",categoryId);
            try {
                var result = await (mCategory.findById(categoryId)).count() > 0;
                console.log("D.A.L [checkCategoryIdExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkCategoryIdExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

        //return Boolean representing existence of the provided categoryName in database
        module.exports.checkCategoryNameExistence = async (categoryName) => {
            console.log("D.A.L [checkCategoryNameExistence] (paramètres) 'categoryName' :",categoryName);
            console.log(await mCategory.count({'categoryName':{'$regex': '^'+categoryName+'$',$options:'im'}}));
            try {
                var result = await mCategory.count({'categoryName':{'$regex': '^'+categoryName+'$',$options:'im'}}) > 0; //Case-insensitive query
                console.log("D.A.L [checkCategoryNameExistence] (return) 'result' : ",result);
                return result;
            } 
            catch (error) {
                console.log("D.A.L [checkCategoryNameExistence] (return) 'err' : ",error);
                return {message:"une erreur est survenue",error};
            }     
        };

    //#endregion

//#endregion

//#region [UPDATE RESSOURCES]

    //Crée un nouvel utilisateur
    module.exports.createCategory = async (categoryObject = null) => {
        console.log("D.A.L [createCategory] (paramètres) 'categoryObject' :",categoryObject);

        if(categoryObject == {} || categoryObject == undefined || categoryObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'category\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {category:{...category informations...}}",
            })
        }
        
        try //Vérification de l'existence du nom du category dans la base de données
        {   
            var categoryNameAlreadyExist = await this.checkCategoryNameExistence(categoryObject.categoryName);
            console.log("D.A.L [createCategory] categoryNameAlreadyExist :",categoryNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createCategory] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'category : \'"+categoryObject.categoryName+"\' dans la base de données",
                exception:exception
            })
        }
        
        if(!categoryNameAlreadyExist)
        {
            try //Création du modèle à partir des données du body de la requête
            {   
                var newCategory = new mCategory({ ...categoryObject });
            }
            catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
            {   
                console.log("D.A.L [createCategory] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la création du modèle pour le nouvel category : \'"+categoryObject.name+"\'",
                    categoryInfoReceipted:categoryObject,
                    exception:exception
                })
            }
        
            try //Sauvegarde du modèle Category dans la BDD
            {   
                await (newCategory.save());
            }
            catch (exception) //ECHEC Sauvegarde du modèle Category dans la BDD
            {   
                console.log("D.A.L [createCategory] (return) 'exception' : ", exception);
                return ({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouveau category : \'"+categoryObject.categoryName+"\'",
                    categoryInfoReceipted:categoryObject,
                    exception:exception
                })
            }
    
            console.log("D.A.L [createCategory] (return) 'status' : SUCCESS");
            return ({
                status:"SUCCESS",
                statusCode:201,
                categoryCreated:categoryObject,
                message: "Utilisateur : \'"+categoryObject.categoryName+"\' Créé avec succès"
            });
        }
        else
        {
            var message = "";
            var nbFieldInError = 0;

            if(categoryNameAlreadyExist) 
            {
                nbFieldInError++;
                message += "\'categoryName\'";
            }

            message = nbFieldInError > 1 
            ? nbFieldInError+" fields values who needs to be uniques in database already exist : "+message 
            : "A field value who need to be unique in database already exist : "+message;

            console.log("D.A.L [createCategory] (return) 'error' : duplicated-field");
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:categoryObject,
                nbError:nbFieldInError,
                message:message
            });
        }

        
    };

    //Mets à jour le category et renvoi le résultat de la mise à jour
    module.exports.updateCategory = async (categoryId,categoryObject = null) => {
        console.log("D.A.L [updateCategory] (paramètres) 'categoryId' :",categoryId,"'categoryObject' :",categoryObject);

        if(categoryObject == {} || categoryObject == undefined || categoryObject == null){
            return({
                status:"BAD_REQUEST",
                statusCode:400,
                message: "Mise à jour de l'utilisateur impossible : Objet \'category\' introuvable dans le body de la requête",
                requiredFormat:"Format du body attendu : {category:{...category informations...}}",
            })
        }

        //Validation des données reçues
        var categoryIdExist = await this.checkCategoryIdExistence(categoryId);

        //Si les deux données reçues sont valides 
        if(!categoryIdExist)
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le category : (ID)=\'"+categoryId+"\' n'a pas été trouvé dans la base de données",
            })
        }

        try //Vérification de l'existence du nom de l'category dans la base de données
        {   
            var categoryNameAlreadyExist = await this.checkCategoryNameExistence(categoryObject.categoryName);
            console.log("D.A.L [createCategory] categoryNameAlreadyExist :",categoryNameAlreadyExist);
        }
        catch(exception) //ECHEC de la vérification de l'existence du nom d'utilisateur dans la base de données
        {
            console.log("D.A.L [createCategory] (return) 'exception' : ", exception);
            return({
                status:"CONTROL_FAILURE",
                statusCode:500,
                message: "Une erreur est survenue durant la vérification de l'existence du nom de l'category : \'"+categoryObject.categoryName+"\' dans la base de données",
                exception:exception
            })
        }

        if(categoryNameAlreadyExist){
            return ({
                status:"FAILURE",
                statusCode:500,
                userInfoReceipted:categoryObject,
                nbError:1,
                message:"A field value who need to be unique in database already exist : categoryName"
            });
        }
    
        try 
        {
            await mCategory.updateOne(
                {_id:categoryId},
                categoryObject
            )
            return({
                status:"SUCCESS",
                statusCode:201,
                message: "L'category : (ID)=\'"+categoryId+"\' a été mis à jour avec succès",
            })
        } 
        catch (exception) 
        {
            return({
                status:"EXCEPTION",
                statusCode:500,
                message: "Une erreur est survenue durant la mise à jour de l'category : (ID)=\'"+categoryId+"\'",
                exception:exception
            })
        }

        //TODO: Vérifier que la mise à jour a bien fonctionnée
    };

    //Supprime un utilisateur et renvoi le résultat de la suppression
    module.exports.deleteCategory = async (categoryId) => {
        console.log("D.A.L [deleteCategory] (paramètres) 'categoryId' :",categoryId);

        //Validation des données reçues
        var categoryIdExist = await this.checkCategoryIdExistence(categoryId);

        //Si les deux données reçues sont valides 
        if(categoryIdExist)
        {
            try 
            {
                await mCategory.deleteOne(
                    {_id:categoryId}
                )
                return({
                    status:"SUCCESS",
                    statusCode:201,
                    message: "Le category : (ID)=\'"+categoryId+"\' a été supprimé avec succès",
                })
            } 
            catch (exception) 
            {
                return({
                    status:"EXCEPTION",
                    statusCode:500,
                    message: "Une erreur est survenue durant la suppression du category : (ID)=\'"+categoryId+"\'",
                    exception:exception
                })
            }
        }
        else
        {
            return({
                status:"NOT_FOUND",
                statusCode:404,
                message: "Le category : (ID)=\'"+categoryId+"\' n'a pas été trouvé dans la base de données",
            })
        }
    };

//#endregion