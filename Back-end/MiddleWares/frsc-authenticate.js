//============= ======= =============//
const CryptoJS = require('crypto-js');

const frscAuthenticate = async (req,res,callback) => {
    const remoteAddress = req.socket.remoteAddress.replace("::ffff:","(IPv4):");
    const requestProtocol = req.protocol;
    const requestMethod = req.method;
    const requestUrl = req.url;


    if(requestUrl == "/auth/register" || requestUrl == "/auth/login")
    {
        callback();
        return;
    }

    const superAdminRequest = req.headers["saReq"] ?? false;
    const adminRequest = req.headers["aReq"] ?? false;
    const moderatorRequest = req.headers["mReq"] ?? false;

    const tokenReceived = req.headers["frsc"]
    console.log("tokenReceived",tokenReceived);


    const now = Date.now();

    var decryptedToken = null;
    if(superAdminRequest)
    {
        tryDecryptSA(tokenReceived).then(decryptedToken => {
            if(decryptedToken != null)
            {
                console.log(decryptedToken);
                callback();
                return;
            }
            else{
                res
                .status(401)
                .json("Unauthorized token");        
            }
        });

        
    }
    else if(adminRequest)
    {

        tryDecryptSA(tokenReceived).then(decryptedToken => {
            if(decryptedToken != null)
            {
                console.log(decryptedToken);

                callback();
                return;
            }
            else{
                tryDecryptA(tokenReceived).then(decryptedToken => {
                    if(decryptedToken != null)
                    {
                        console.log(decryptedToken);
                        callback();
                        return;
                    }
                    else{
                        res
                        .status(401)
                        .json("Unauthorized token");        
                    }
                });       
            }
        }); 
    }
    else if(moderatorRequest)
    {

        tryDecryptSA(tokenReceived).then(decryptedToken => {
            if(decryptedToken != null)
            {
                console.log(decryptedToken);

                callback();
                return;
            }
            else{
                tryDecryptA(tokenReceived).then(decryptedToken => {
                    if(decryptedToken != null)
                    {
                        console.log(decryptedToken);

                        callback();
                        return;
                    }
                    else{
                        tryDecryptM(tokenReceived).then(decryptedToken => {
                            if(decryptedToken != null)
                            {
                                console.log(decryptedToken);

                                callback();
                                return;
                            }
                            else{
                                res
                                .status(401)
                                .json("Unauthorized token");        
                            }
                        });        
                    }
                });        
            }
        }); 
    }
    else
    {
        tryDecryptSA(tokenReceived).then(decryptedToken => {
            if(decryptedToken != null)
            {
                console.log(decryptedToken);

                callback();
                return;
            }
            else{
                tryDecryptA(tokenReceived).then(decryptedToken => {
                    if(decryptedToken != null)
                    {
                        console.log(decryptedToken);
                        callback();
                        return;
                    }
                    else{
                        tryDecryptM(tokenReceived).then(decryptedToken => {
                            if(decryptedToken != null)
                            {
                                console.log(decryptedToken);

                                callback();
                                return;
                            }
                            else{
                                tryDecryptU(tokenReceived).then(decryptedToken => {
                                    if(decryptedToken != null)
                                    {
                                        console.log(decryptedToken);

                                        callback();
                                        return;
                                    }
                                    else{
                                        res
                                        .status(401)
                                        .json("Unauthorized token");        
                                    }
                                });        
                            }
                        });       
                    }
                });       
            }
        });    
    }
};

const tryDecryptSA = async(frsc) => {
    try {
        const decryptedSAToken = CryptoJS.AES.decrypt(frsc, "Super-admin").toString(CryptoJS.enc.Utf8);

        if(validateTokenFormat(STRdecryptedSAToken))
        {
            return STRdecryptedSAToken;
        }
        else
        {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const tryDecryptA = async(frsc) => {
    try {
        const decryptedAToken = CryptoJS.AES.decrypt(frsc, "Admin").toString(CryptoJS.enc.Utf8);
        validateTokenFormat(decryptedAToken).then(tokenFormatIsValid => {
            console.log(tokenFormatIsValid);
            if(tokenFormatIsValid)
            {
                console.log("is validated");
                return decryptedAToken;
            }
            else
            {
                console.log("is not validated")

                return null;
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const tryDecryptM = async(frsc) => {
    try {
        const decryptedMToken = CryptoJS.AES.decrypt(frsc, "Moderateur").toString(CryptoJS.enc.Utf8);
        if(validateTokenFormat(decryptedMToken))
        {
            return decryptedMToken;
        }
        else
        {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const tryDecryptU = async(frsc) => {
    try {
        const decryptedUToken = CryptoJS.AES.decrypt(frsc, "User").toString(CryptoJS.enc.Utf8);
        if(validateTokenFormat(decryptedUToken))
        {
            return decryptedUToken;
        }
        else
        {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const validateTokenFormat = async(token) => {
    console.log("validating",token)
    console.log("length",token.length)
    if(token.length > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

module.exports = frscAuthenticate;