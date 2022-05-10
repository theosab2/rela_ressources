//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mUt = require('../models/UTable');

//Logger prefix
const queryServiceLogPrefix   = "    (ut)            D.A.L ";

//#region [SCHEMA]

    module.exports.getSchemaPath = async () => {
        console.log(queryServiceLogPrefix,"[getSchemaPath] ()");
        console.log(queryServiceLogPrefix,"[getSchemaPath] (return) schemaPath");
        return Object.entries(mUt.schema.paths);
    };

//#endregion

//#region [GET RESSOURCES]

    //Retourhe le schéma détaillé du model 'article'
    module.exports.getAllByCode = async (code) => {
        console.log(queryServiceLogPrefix,"[getAllByCode] (params) \'code\' : ",code);

        try {
            var data = await mUt.find().where('code').equals(code);
            if(data.length > 0){
                console.log(queryServiceLogPrefix,"[getAllByCode] (return) ",data.length," element",data.length > 1 ?'s':'');
                return {
                    ut:data,
                    count:data.length
                };

            }else{
                console.log(queryServiceLogPrefix,"[getAllByCode] (return) 0 element : nothing found for code : ",code);
                return {
                    message:"aucun ut enregistré en base de données pour le code fourni : "+code
                };

            }       
        } 
        catch (error) {
            console.log(queryServiceLogPrefix,"[getAllByCode] (error) ",error);
            return {message:"une erreur est survenue",error};
        }  
    };
//#endregion

//#region [UPDATE RESSOURCES]
module.exports.saveOne = async (newUtModel) => {
    try //Création du modèle à partir des données du body de la requête
    {
        console.log(queryServiceLogPrefix,"[create] (info) creating message object before database insertion");
        var newUt = new mUt({ ...newUtModel });
    }
    catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
    {   
        console.log(queryServiceLogPrefix,"[create] (error) exception occur during message object creation : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant la création du modèle pour le nouvel ut : \'"+newUtModel.name+"\'",
            utInfoReceipted:newUtModel,
            exception:exception
        })
    }

    try //Création du modèle à partir des données du body de la requête
    {
        console.log(queryServiceLogPrefix,"[create] (info) saving created ut object in database");
        newUt.save()
    }
    catch (exception) //ECHEC Création du modèle à partir des données du body de la requête
    {   
        console.log(queryServiceLogPrefix,"[create] (error) exception occur during ut object save in database : ",exception);
        return ({
            status:"EXCEPTION",
            statusCode:500,
            message: "Une erreur est survenue durant la création du modèle pour le nouvel article : \'"+newUtModel.name+"\'",
            utInfoReceipted:newUtModel,
            exception:exception
        })
    }
}

//#endregion

//#region [QUERY RESSOURCES]
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
                var data = await mUt.find().where(query);
                var result = 
                data ? {
                    uts:data,
                    count:data.length
                } : {
                    message:"aucun ut trouvée en base de données correspondant à la query"
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

//#endregion