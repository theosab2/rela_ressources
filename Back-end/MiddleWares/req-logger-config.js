const requestLogger = (req,res,callback) => {
    const remoteAddress = req.socket.remoteAddress.replace("::ffff:","(IPv4):");
    const requestProtocol = req.protocol;
    const requestMethod = req.method;
    const requestUrl = req.url;

    logRequest(remoteAddress,requestProtocol,requestMethod,requestUrl)

    callback();
};

const logRequest = (rA,rP,rM,rU) => {
    console.log(`${rA} => (${rP}) ${rM} ${rU}`);
}

module.exports = requestLogger;