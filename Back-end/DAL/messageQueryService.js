
//mongoose
const mongoose = require('mongoose');

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mMessage = require('../models/message');

const queryServiceLogPrefix = "    (message)      D.A.L ";

module.exports.getSchemaPath = async () => {
    console.log(queryServiceLogPrefix,"[getSchemaPath] ()");
    console.log(queryServiceLogPrefix,"[getSchemaPath] (return) schemaPath");
    return Object.entries(mMessage.schema.paths);
};

module.exports.getAll = async () => {
    console.log(queryServiceLogPrefix,"[getAll] ()");

    try {
        var data = await mMessage.find();
        if(data.length > 0){
            console.log(queryServiceLogPrefix,"[getAll] (return) ",data.length," element",data.length > 1 ?'s':'');
            return {
                messages:data,
                count:data.length
            };

        }else{
            console.log(queryServiceLogPrefix,"[getAll] (return) 0 element : no message found");
            return {
                message:"aucun message enregistré en base de données"
            };

        }       
    } 
    catch (error) {
        console.log(queryServiceLogPrefix,"[getAll] (error) ",error);
        return {message:"une erreur est survenue",error};
    }  
};

module.exports.query = async (query = {}) => {
    console.log(queryServiceLogPrefix,"[query] (param) 'query' : ",query);


    //TODO application service check query template
    

    if(query === {})
    {   //Pas de query, on renvoit tous les messagtes en base de données (même format de retour)
        console.log(queryServiceLogPrefix,"[query] (return) 'all' : ",data.length," element",data.length > 1 ?'s':'');
        return this.getAll();
    }
    else
    {   //On prend en compte la query transmise à l'API
        parsedQuery = await _queryParserService.parseObjectQuery(query);
        
        try {
            var data = await mMessage.find().where(query);
            var result = 
            data ? {
                messages:data,
                count:data.length
            } : {
                message:"aucun message trouvé en base de données correspondant à la query"
            };
            console.log(queryServiceLogPrefix,"[query] (return) : ",data.length," element",data.length > 1 ?'s':'');
            return result 
            
        } 
        catch (error) {
            console.log(queryServiceLogPrefix,"[query] (error) : ",error);
            return {message:"une erreur est survenue",error};
        }   
    }
};

module.exports.saveOne = async (newMessageModel) => {
    try //Création du modèle à partir des données du body de la requête
    {
        console.log(queryServiceLogPrefix,"[create] (info) creating message object before database insertion");
        var newMessage = new mMessage({ ...newMessageModel });
    }
    catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
    {   
        console.log(queryServiceLogPrefix,"[create] (error) exception occur during message object creation : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newMessageModel.name+"\'",
            messageInfoReceipted:messageObject,
            exception:exception
        })
    }
    newMessage.save()
}