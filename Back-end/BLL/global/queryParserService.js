//#region [Methods]

    const queryParserLogPrefix = "    (query-parser)  B.L.L ";

    
    //Extrait les paramètres entre crochets
    module.exports.parseObjectQuery = async (query) => {
        console.log(queryParserLogPrefix,"[parseObjectQuery] (paramètres) 'query' : ",query);
        for (var [key, value] of Object.entries(query)) {
            //TODO external method
            if(typeof(value) ==  typeof(""))
            {
                var LIKE = await this.parseParameter_Like(value);

                var CASE_INSENSITIVE = await this.parseParameter_CaseInsensitive(value);

                var IS_NOT_NULL = await this.parseParameter_IsNotNull(value);


                console.log(queryParserLogPrefix,key,": CASE INSENSITIVE :",CASE_INSENSITIVE);
                console.log(queryParserLogPrefix,key,": LIKE :",LIKE);
                console.log(queryParserLogPrefix,key,": IS NOT NULL :",IS_NOT_NULL);

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
        console.log(queryParserLogPrefix,"[parseObjectQuery] (return) 'parsed-query' : ",query);
        return query;
    };

    //Detect parameter "Is not null" inside input string, return boolean
    module.exports.parseParameter_IsNotNull = async (input) => {
        
        var UPPERVAL = input.toUpperCase();
        var parameterDetected = 
        (
            UPPERVAL.includes("[IS NOT NULL]") ||
            UPPERVAL.includes("[IS_NOT_NULL]") ||
            UPPERVAL.includes("[NOT NULL]") ||
            UPPERVAL.includes("[NOT_NULL]") ||
            UPPERVAL.includes("[!NULL]")
        )
        return parameterDetected;
    };

    //Detect parameter "Case insensitive" inside input string, return boolean
    module.exports.parseParameter_CaseInsensitive = async (input) => {
        
        var UPPERVAL = input.toUpperCase();
        var parameterDetected = 
        (
            UPPERVAL.includes("[CASE_INSENSITIVE]") ||
            UPPERVAL.includes("[CASE INSENSITIVE]") ||
            UPPERVAL.includes("[CI]")
        )
        return parameterDetected;
    };

    //Detect parameter "Like" inside input string, return boolean
    module.exports.parseParameter_Like = async (input) => {
        
        var UPPERVAL = input.toUpperCase();
        var parameterDetected = 
        (
            UPPERVAL.includes("[LIKE]")
        )
        return parameterDetected;
    };

//#endregion