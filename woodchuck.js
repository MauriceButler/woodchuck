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
            inputUrl : "https://logs-01.loggly.com/inputs/",
            subdomain: subDomain,
            level: currentLogLevel.name,
            json: true
        },
        client = loggly.createClient(logglyConfig);

    function error(message, callback){
        processMessage(message, logLevels.error, callback);
    }

    function warn(message, callback){
        processMessage(message, logLevels.warn, callback);
    }

    function info(message, callback){
        processMessage(message, logLevels.info, callback);
    }

    function debug(message, callback){
        processMessage(message, logLevels.debug, callback);
    }

    function processMessage(message, logLevel, callback) {
        if(!logLevel){
            logLevel = logLevels.log;
        }

        if(logLevel.value <= currentLogLevel.value){
            if(!logglyKey){
                sendToConsole(message, logLevel);
                return;
            }

            sendToLoggly(message, logLevel, callback);
        }
    }

    function sendToConsole(message, logLevel){
        console.log(logLevel.name.toUpperCase() + ' : ' + (message && message.stack || message && message.message || message));
    }

    function sendToLoggly(message, logLevel, callback){

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

        client.log(logglyKey, message, function(error, result) {
            if (error) {
                return callback(error);
            }

            return callback(null, result);
        });
    }

    return {
        error : error,
        warn : warn,
        info : info,
        debug : debug,
        log: processMessage
    };
};