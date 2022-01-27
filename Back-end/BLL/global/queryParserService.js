//#region [Methods]
    
    //Extrait les paramètres entre crochets
    module.exports.parseObjectQuery = async (query) => {
        for (var [key, value] of Object.entries(query)) {
            //TODO external method
            if(typeof(value) ==  typeof(""))
            {
                var UPPERVAL = value.toUpperCase();

                //TODO external method
                var LIKE = 
                    UPPERVAL.includes("[LIKE]")
                ;

                //TODO external method
                var CASE_INSENSITIVE = 
                    UPPERVAL.includes("[CASE_INSENSITIVE]") ||
                    UPPERVAL.includes("[CASE INSENSITIVE]") ||
                    UPPERVAL.includes("[CI]")
                ;

                //TODO external method
                var IS_NOT_NULL =   
                    UPPERVAL.includes("[IS NOT NULL]") ||
                    UPPERVAL.includes("[IS_NOT_NULL]") ||
                    UPPERVAL.includes("[NOT NULL]") ||
                    UPPERVAL.includes("[NOT_NULL]") ||
                    UPPERVAL.includes("[!NULL]")
                ;


                //TODO suppression des paramètres entre crochets

                console.log(key,": CASE INSENSITIVE :",CASE_INSENSITIVE);
                console.log(key,": LIKE :",LIKE);
                console.log(key,": IS NOT NULL :",IS_NOT_NULL);

                if(LIKE && !CASE_INSENSITIVE)
                {
                    query[key] =
                    {
                        $regex :
                        (
                            value
                            .replace("[LIKE]","")
                            .trim()
                        )
                        ,$options:''
                    };
                }

                if(LIKE && CASE_INSENSITIVE)
                {
                    query[key] =
                    {
                        $regex :
                        (
                            value
                            .replace("[LIKE]","")
                            .replace("[CI]","")
                            .replace("[CASE_INSENSITIVE]","")
                            .replace("[CASE INSENSITIVE]","")
                            .trim()
                        )
                        ,$options:'i'
                    };
                }

                if(CASE_INSENSITIVE && !LIKE)
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
            }
        }
        return query;
    };

    module.exports.parseParameter_IsNotNull = async (input) => {

    };

//#endregion