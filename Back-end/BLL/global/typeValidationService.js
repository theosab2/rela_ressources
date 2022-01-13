//#region [Methods]
    
    //Verifie que le paramètre est une adresse e-mail
    module.exports.isEmail = async (input) => {
        console.log("TypeValidation [isEmail]");
        console.log("[isEmail] (paramètres) 'input' :",input);

        var regex= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(input !== '' && input != null && input.match(regex)){
            return true;
        }
        else{
            return false;
        }
    };

    //Verifie que le paramètre est un numéro de téléphone
    module.exports.isPhoneNumber = async (input) => {
        console.log("TypeValidation [isPhoneNumber]");
        console.log("[isPhoneNumber] (paramètres) 'input' :",input);

        var regex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if(input !== '' && input != null && input.match(regex)){
            return true;
        }
        else{
            return false;
        }
    };

//#endregion