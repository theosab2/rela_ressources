//===== DAL =====//
const _commentQueryService = require("../DAL/commentQueryService");

//===== BLL =====//
const _commentApplicationService = require("../BLL/commentApplicationService");

//Logger prefix
const controllerLogPrefix = "    (comment)  CONTROLLER ";



//#region [GET_RESSOURCES]

module.exports.getAll = async () => {
    console.log(controllerLogPrefix,"[getAll] ()");
    
    // get comment from BDD filtered by code
    let data = await _commentQueryService.getAll();
    
    return data;
};

module.exports.getOne = async (commentId) => {
    console.log(controllerLogPrefix,"[getOne] (params) commentId : ",commentId);
    
    // get comment from BDD filtered by code
    let data = await _commentQueryService.getById(commentId);
    
    return data;
};

//#endregion

//#region [SCHEMA]

    //basic schema
    module.exports.getSchema = async () => {
        console.log(controllerLogPrefix,"[getSchema] ()");
        
        //Initialisation de la variable de retour
        let schema = {
                        
        }

        //Récupération du informations du schema du modèle
        let schemaPaths = await _commentQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            schema[key] = value.instance
            + " " 
            + ((value.options.required == true) ? "|R" : "")
            + ((value.options.unique == true) ? "|U" : "")
            + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
        }

        console.log(controllerLogPrefix,"[getSchema] (return) schema");
        return schema;
    };

    //detailled schema
    module.exports.getDetailledSchema = async () => {
        console.log(controllerLogPrefix,"[getDetailledSchema] ()");

            //Initialisation de la variable de retour
        let detailledSchema = {
            
        }
        
        //Récupération du informations du schema du modèle
        let schemaPaths = await _commentQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            detailledSchema[key] = 
                {
                    "type":value.instance,
                    "required":(value.options.required == true),
                    "unique":(value.options.unique == true)
                };
        }

        // get comment from BDD filtered by code
        console.log(controllerLogPrefix,"[getDetailledSchema] (return) detailledSchema");
        return detailledSchema;
    };

//#endregion

//#region [QUERY RESSOURCES]

    module.exports.getQueryTemplate = async () => {
        console.log(controllerLogPrefix,"[getQueryTemplate] ()");

        //Initialisation de la variable de retour
        let template = {}

        let schemaPaths = await _commentQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            template[key] = 
                {
                    "type":value.instance,
                    "required":(value.options.required == true),
                    "unique":(value.options.unique == true)
                };
        }

        console.log(controllerLogPrefix,"[getQueryTemplate] (return) query-template");
        return template;
    };

    //return comments filtered by query
    module.exports.query = async (query = {}) => {
        console.log(controllerLogPrefix,"[query] (paramètres) 'query' : ",query);

        //TODO application service check query template

        if(query === {})
        {   //Pas de query, on renvoit tous les comments en base de données (même format de retour)
            console.log(controllerLogPrefix,"[query] empty-query");
            return this.getAll();
        }
        else
        {   //On prend en compte la query transmise à l'API            
            try {
                let data = await _commentQueryService.query(query);
                console.log(controllerLogPrefix,"[query] (return) : ",data.comments.length," element",data.comments.length > 1 ?'s':'');
                return data;
            } 
            catch (error) {
                console.log(controllerLogPrefix,"[query] (error) : ",error);
                return {message:"une erreur est survenue",error};
            }   
        }

        
            
        
    };

//#endregion

//#region [UPDATE RESSOURCES]

module.exports.create = async (requestBody = null) => {
    console.log(controllerLogPrefix,"[create] (paramètres) 'requestBody' :\n",requestBody);

    let commentObject = requestBody.comment;

    if(commentObject == {} || commentObject == undefined || commentObject == null){
        console.log(controllerLogPrefix,"[create] (return) BAD_REQUEST : comment not found in request body");
        return({
            status:"BAD_REQUEST",
            statusCode:400,
            message: "Création du comment impossible : Objet \'comment\' introuvable dans le body de la requête",
            requiredFormat:"Format du body attendu : {comment:{...comment's informations...}}",
        })
    }

    try //Sauvegarde du modèle Comment dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (info) saving created message object in the database");
        await _commentQueryService.saveOne(commentObject);
    }
    catch (exception) //ECHEC Sauvegarde du modèle Comment dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (error) exception occur while saving comment object to the database : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouvel comment : \'"+commentObject.title+"\'",
            commentInfoReceipted:commentObject,
            exception:exception
        })
    }

    console.log(controllerLogPrefix,"[create] (return) \'status\' : SUCCESS");
    return ({
        status:"SUCCESS",
        statusCode:201,
        commentCreated:commentObject,
        message: "Comment : \'"+commentObject.title+"\' Créé avec succès"
    });    
};

//#endregion