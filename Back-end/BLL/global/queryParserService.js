//#region [Methods]
    
    //Extrait les paramètres entre crochets
    module.exports.parseObjectQuery = async (query) => {
        for (var [key, value] of Object.entries(query)) {

            let UPPERVAL = value.toUpperCase();

            //TODO external method
            let LIKE = 
                UPPERVAL.includes("[LIKE]")
            ;

            //TODO external method
            let CASE_INSENSITIVE = 
                UPPERVAL.includes("[CASE_INSENSITIVE]") ||
                UPPERVAL.includes("[CASE INSENSITIVE]") ||
                UPPERVAL.includes("[CI]")
            ;

            //TODO external method
            let IS_NOT_NULL =   
                UPPERVAL.includes("[IS NOT NULL]") ||
                UPPERVAL.includes("[IS_NOT_NULL]") ||
                UPPERVAL.includes("[NOT NULL]") ||
                UPPERVAL.includes("[NOT_NULL]") ||
                UPPERVAL.includes("[!NULL]")
            ;

            //TODO suppression des paramètres entre crochets


            if(CASE_INSENSITIVE)
            {
                query[key] =
                {
                    $regex :
                    (
                        "^"+
                        value
                        .replace("[CASE_INSENSITIVE]","")
                        .replace("[CASE INSENSITIVE]","")
                        .replace("[CI]","")
                        .trim()
                        +"$"
                    )
                    ,$options:'im'
                };
            }

            if(IS_NOT_NULL)
            {
                query[key] = {$ne: null}
            }
                 
            console.log(key,": CASE INSENSITIVE :",CASE_INSENSITIVE);
            console.log(key,": IS NOT NULL :",IS_NOT_NULL);
        }
        console.log(query)
        return query;
    };

//#endregion