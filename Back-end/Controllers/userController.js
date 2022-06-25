//===== DAL =====//
const _userQueryService = require("../DAL/userQueryService");

//===== BLL =====//
const _userApplicationService = require("../BLL/userApplicationService");

//Logger prefix
const controllerLogPrefix = "    (user)  CONTROLLER ";



//#region [GET_RESSOURCES]

module.exports.getAll = async () => {
    console.log(controllerLogPrefix,"[getAll] ()");
    
    // get user from BDD filtered by code
    let data = await _userQueryService.getAll();
    
    return data;
};

module.exports.getOne = async (userId) => {
    console.log(controllerLogPrefix,"[getOne] (params) userId : ",userId);
    
    // get user from BDD filtered by code
    let data = await _userQueryService.getById(userId);
    
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
        let schemaPaths = await _userQueryService.getSchemaPath();

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
        let schemaPaths = await _userQueryService.getSchemaPath();

        //Remplissage de la variable de retour
        for (const [key, value] of schemaPaths) {
            detailledSchema[key] = 
                {
                    "type":value.instance,
                    "required":(value.options.required == true),
                    "unique":(value.options.unique == true)
                };
        }

        // get user from BDD filtered by code
        console.log(controllerLogPrefix,"[getDetailledSchema] (return) detailledSchema");
        return detailledSchema;
    };

//#endregion

//#region [QUERY RESSOURCES]

    module.exports.getQueryTemplate = async () => {
        console.log(controllerLogPrefix,"[getQueryTemplate] ()");

        //Initialisation de la variable de retour
        let template = {}

        let schemaPaths = await _userQueryService.getSchemaPath();

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
        {   //Pas de query, on renvoit tous les users en base de données (même format de retour)
            console.log(controllerLogPrefix,"[query] empty-query");
            return this.getAll();
        }
        else
        {   //On prend en compte la query transmise à l'API            
            try {
                let data = await _userQueryService.query(query);
                console.log(controllerLogPrefix,"[query] (return) : ",data.users.length," element",data.users.length > 1 ?'s':'');
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

    let userObject = requestBody.user;

    if(userObject == {} || userObject == undefined || userObject == null){
        console.log(controllerLogPrefix,"[create] (return) BAD_REQUEST : user not found in request body");
        return({
            status:"BAD_REQUEST",
            statusCode:400,
            message: "Création du user impossible : Objet \'user\' introuvable dans le body de la requête",
            requiredFormat:"Format du body attendu : {user:{...user's informations...}}",
        })
    }

    try //Sauvegarde du modèle User dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (info) saving created message object in the database");
        var creationQuery = await _userQueryService.saveOne(userObject);
    }
    catch (exception) //ECHEC Sauvegarde du modèle User dans la BDD
    {   
        console.log(controllerLogPrefix,"[create] (error) exception occur while saving user object to the database : ",exception);
        return creationQuery
    }

    console.log(controllerLogPrefix,"[create] (return) \'status\' : SUCCESS");
    return creationQuery
};

//#endregion