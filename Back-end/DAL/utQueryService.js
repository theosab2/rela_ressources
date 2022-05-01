//mongoose
const mongoose = require('mongoose');

//Import B.L.L associée

//Import B.L.L global
const _queryParserService = require("../BLL/global/queryParserService");
const _typeValidationService = require("../BLL/global/typeValidationService");


//Import du modèle relatif
const mUt = require('../models/UTable');

//#region [QUERY RESSOURCES]

    //#region [SCHEMA]
        
        //Retourhe le schéma détaillé du model 'article'
        module.exports.getAllByCode = async (code) => {
            console.log("       D.A.L [getAllByCode] (params) \'code\' : ",code);

            try {
                var data = await mUt.find().where('code').equals(code);
                if(data.length > 0){
                    console.log("       D.A.L [getAllByCode] (return) ",data.length," element",data.length > 1 ?'s':'');
                    return {
                        ut:data,
                        count:data.length
                    };

                }else{
                    console.log("       D.A.L [getAllByCode] (return) 0 element : nothing found for code : ",code);
                    return {
                        message:"aucun ut enregistré en base de données pour le code fourni : "+code
                    };

                }       
            } 
            catch (error) {
                console.log("       D.A.L [getAllByCode] (error) ",error);
                return {message:"une erreur est survenue",error};
            }  
        };