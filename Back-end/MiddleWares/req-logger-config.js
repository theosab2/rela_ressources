const requestLogger = (req,res,callback) => {
    const remoteAddress = req.socket.remoteAddress.replace("::ffff:","(IPv4):");
    const requestProtocol = req.protocol;
    const requestMethod = req.method;
    const requestUrl = req.url;

    const now = new Date();
    const timestamp = `${now.toLocaleDateString("fr-FR")}|${now.toLocaleTimeString("fr-FR")}`;

    logRequest(timestamp,remoteAddress,requestProtocol,requestMethod,requestUrl)

    callback();
};

const logRequest = (tS,rA,rP,rM,rU) => {
    console.log(`[${tS}] ${rA} => (${rP}) ${rM} ${rU}`);
}

module.exports = requestLogger;