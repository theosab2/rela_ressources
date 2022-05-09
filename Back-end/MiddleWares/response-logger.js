const responseLogger = (request) => {
    const rA = request.socket.remoteAddress.replace("::ffff:","(IPv4):");
    const rP = request.protocol;
    const rM = request.method;
    const rU = request.url;
    
    console.log(`${rA} <= (${rP}) ${rM} ${rU}`);
}

module.exports = responseLogger;