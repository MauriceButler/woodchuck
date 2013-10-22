module.exports = function(logglyKey, subDomain, logLevel){
    var loggly = require('loggly'),
        logLevels = {
            error : { name: 'error', value: 1 },
            warn : { name: 'warn', value: 2 },
            info : { name: 'info', value: 3 },
            debug : { name: 'debug', value: 4 },
            log : { name: 'log', value: 5 }
        },
        currentLogLevel = logLevels[logLevel] || logLevels.log,
        logglyConfig = {
            subdomain: subDomain,
            level: currentLogLevel.name,
            json: true
        },
        client = loggly.createClient(logglyConfig);

    function error(message){
        processMessage(message, logLevels.error);
    }

    function warn(message){
        processMessage(message, logLevels.warn);
    }

    function info(message){
        processMessage(message, logLevels.info);
    }

    function debug(message){
        processMessage(message, logLevels.debug);
    }

    function processMessage(message, logLevel) {
        if(!logLevel){
            logLevel = logLevels.log;
        }

        if(logLevel.value <= currentLogLevel.value){
            if(!logglyKey){
                sendToConsole(message, logLevel);
                return;
            }

            sendToLoggly(message, logLevel);
        }
    }

    function sendToConsole(message, logLevel){
        console.log(logLevel.name.toUpperCase() + ' : ' + (message && message.stack || message));
    }

    function sendToLoggly(message, logLevel){

        if(typeof message === 'string'){
            message = { message : message };
        }

        if(message instanceof Error){
            message = {
                message : message.toString(),
                stack : message.stack
            };
        }

        message.level = logLevel.name;

        client.log(logglyKey, message);
    }

    return {
        error : error,
        warn : warn,
        info : info,
        debug : debug,
        log: processMessage
    };
};