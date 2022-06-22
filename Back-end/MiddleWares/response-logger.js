const responseLogger = (request) => {
    const rA = request.socket.remoteAddress.replace("::ffff:","(IPv4):");
    const rP = request.protocol;
    const rM = request.method;
    const rU = request.url;
    const dT = Date.toString();
    
    console.log(`[${dT}]${rA} <= (${rP}) ${rM} ${rU}`);
    console.log(``); //Ligne vide pour la lisibilité des logs

}

module.exports = responseLogger;