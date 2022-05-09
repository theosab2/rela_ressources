//===== DAL =====//
const _messageQueryService = require("../DAL/messageQueryService");

//===== BLL =====//
//const _utApplicationService = require("../BLL/utApplicationService");

const controllerLogPrefix = "    (message) CONTROLLER ";

//#region [SCHEMA]

    //basic schema
    module.exports.getSchema = async () => {
        console.log(controllerLogPrefix,"[getSchema] ()");
        
        //Initialisation de la variable de retour
        let schema = {
                        
        }

        //Récupération du informations du schema du modèle
        let schemaPaths = await _messageQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            schema[key] = value.instance
            + " " 
            + ((value.options.required == true) ? "|R" : "")
            + ((value.options.unique == true) ? "|U" : "")
            + (((value.options.required == true)||(value.options.unique == true)) ? "|" : "");
        }

        console.log("    (message) CONTROLLER [getSchema] (return) schema");
        return schema;
    };

    //detailled schema
    module.exports.getDetailledSchema = async () => {
        console.log(controllerLogPrefix,"[getDetailledSchema] ()");

            //Initialisation de la variable de retour
        let detailledSchema = {
            
        }
        
        //Récupération du informations du schema du modèle
        let schemaPaths = await _messageQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            detailledSchema[key] = 
                {
                    "type":value.instance,
                    "required":(value.options.required == true),
                    "unique":(value.options.unique == true)
                };
        }

        // get UT from BDD filtered by code
        console.log(controllerLogPrefix,"[getDetailledSchema] (return) detailledSchema");
        return detailledSchema;
    };

//#endregion

//#region [QUERY RESSOURCES]

    module.exports.getQueryTemplate = async () => {
        console.log(controllerLogPrefix,"[getQueryTemplate] ()");

        //Initialisation de la variable de retour
        let template = {}

        let schemaPaths = await _messageQueryService.getSchemaPath();

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
        {   //Pas de query, on renvoit tous les utilisateurs en base de données (même format de retour)
            console.log(controllerLogPrefix,"[query] empty-query");
            return this.getAll();
        }
        else
        {   //On prend en compte la query transmise à l'API            
            try {
                let data = await _messageQueryService.query(query);
                console.log(controllerLogPrefix,"[query] (return) : ",data.messages.length," element",data.messages.length > 1 ?'s':'');
                return data;
            } 
            catch (error) {
                console.log(controllerLogPrefix,"[query] (error) : ",error);
                return {message:"une erreur est survenue",error};
            }   
        }

        
            
        
    };

//#endregion

//#region [GET_RESSOURCES]

module.exports.getAll = async () => {
    console.log(controllerLogPrefix,"[getAll] () ");
    var data = await _messageQueryService.getAll();
    console.log(controllerLogPrefix,"[getAll] () ");

    return data
}

//#endregion

//#region [UPDATE RESSOURCES]


module.exports.create = async (requestBody = null) => {
    console.log(controllerLogPrefix,"[create] (paramètres) 'requestBody' :",requestBody);

    let messageObject = requestBody.message;

    if(messageObject == {} || messageObject == undefined || messageObject == null){
        console.log(controllerLogPrefix,"[create] (return) BAD_REQUEST : message not found in request body");
        return({
            status:"BAD_REQUEST",
            statusCode:400,
            message: "Création du message impossible : Objet \'message\' introuvable dans le body de la requête",
            requiredFormat:"Format du body attendu : {message:{...message informations...}}",
        })
    }

    try //Sauvegarde du modèle Article dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (info) saving created message object in the database");
        await _messageQueryService.saveOne(messageObject);
    }
    catch (exception) //ECHEC Sauvegarde du modèle Article dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (error) exception occur while saving message object to the database : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant l'enregistrement du modèle dans la base de données pour le nouveau message : \'"+messageObject.body+"\'",
            messageInfoReceipted:messageObject,
            exception:exception
        })
    }

    console.log(controllerLogPrefix,"[create] (return) \'status\' : SUCCESS");
    return ({
        status:"SUCCESS",
        statusCode:201,
        messageCreated:messageObject,
        message: "Message : \'"+messageObject.body+"\' Créé avec succès"
    });    
};

//#endregion
