
//mongoose
const mongoose = require('mongoose');

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mRelation = require('../models/relation');

const queryServiceLogPrefix = "    (relation)      D.A.L ";

module.exports.getSchemaPath = async () => {
    console.log(queryServiceLogPrefix,"[getSchemaPath] ()");
    console.log(queryServiceLogPrefix,"[getSchemaPath] (return) schemaPath");
    return Object.entries(mRelation.schema.paths);
};

module.exports.getAll = async () => {
    console.log(queryServiceLogPrefix,"[getAll] ()");

    try {
        var data = await mRelation.find();
        if(data.length > 0){
            console.log(queryServiceLogPrefix,"[getAll] (return) ",data.length," element",data.length > 1 ?'s':'');
            return {
                relations:data,
                count:data.length
            };

        }else{
            console.log(queryServiceLogPrefix,"[getAll] (return) 0 element : no relation found");
            return {
                message:"aucune relation enregistrée en base de données"
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
            var data = await mRelation.find().where(query);
            var result = 
            data ? {
                relations:data,
                count:data.length
            } : {
                message:"aucune relation trouvée en base de données correspondant à la query"
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

module.exports.saveOne = async (newRelationModel) => {
    try //Création du modèle à partir des données du body de la requête
    {
        console.log(queryServiceLogPrefix,"[create] (info) creating message object before database insertion");
        var newRelation = new mRelation({ ...newRelationModel });
    }
    catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
    {   
        console.log(queryServiceLogPrefix,"[create] (error) exception occur during message object creation : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newRelationModel.name+"\'",
            relationInfoReceipted:newRelationModel,
            exception:exception
        })
    }

    try //Création du modèle à partir des données du body de la requête
    {
        console.log(queryServiceLogPrefix,"[create] (info) saving created relation object in database");
        newRelation.save()
    }
    catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
    {   
        console.log(queryServiceLogPrefix,"[create] (error) exception occur during relation object save in database : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newRelationModel.name+"\'",
            relationInfoReceipted:newRelationModel,
            exception:exception
        })
    }
}