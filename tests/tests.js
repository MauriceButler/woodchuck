var test = require('tape'),
    mockery = require('mockery');

mockery.registerAllowables(['../woodchuck']);
mockery.registerMock('loggly', {createClient: function(){}});

function getCleanTestObject(logglyKey, subDomain, logLevel){
    mockery.enable({ useCleanCache: true, warnOnReplace: false });
    var woodchuck = require('../woodchuck')(logglyKey, subDomain, logLevel);
    mockery.disable();
    return woodchuck;
}

// test('if not created with logglyKey uses console.log', function (t) {
//     var testMessage = 'test message',
//         woodchuck = getCleanTestObject();

//     woodchuck.log(testMessage);
//     t.end();
// });

test('woodchuck Exists', function (t) {
    t.plan(2);
    var woodchuck = getCleanTestObject();
    t.ok(woodchuck, 'woodchuck Exists');
    t.equals(typeof woodchuck, 'object',  'woodchuck is an object');
    t.end();
});

test('woodchuck created with params uses them', function (t) {
    t.plan(3);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.log(testMessage);
});

test('woodchuck error send error type', function (t) {
    t.plan(4);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                    t.equal(message.level, 'error', 'correct level');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.error(testMessage);
});

test('woodchuck warn send warn type', function (t) {
    t.plan(5);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            t.equal(config.subdomain, testSubDomain, 'correct subdomain');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                    t.equal(message.level, 'warn', 'correct level');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.warn(testMessage);
});

test('woodchuck info send info type', function (t) {
    t.plan(4);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                    t.equal(message.level, 'info', 'correct level');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.info(testMessage);
});

test('woodchuck debug send debug type', function (t) {
    t.plan(4);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                    t.equal(message.level, 'debug', 'correct level');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.debug(testMessage);
});

test('woodchuck log send log type', function (t) {
    t.plan(4);
    var testLogLevel = 'log',
        testLogglyKey = '123456',
        testSubDomain = 'testDomain',
        testMessage = 'test message';

    mockery.registerMock('loggly', {
        createClient: function(config){
            t.equal(config.level, testLogLevel, 'correct log level');
            return {
                log: function(logglyKey, message){
                    t.equal(logglyKey, testLogglyKey, 'correct logglyKey');
                    t.equal(message.message, testMessage, 'correct message');
                    t.equal(message.level, 'log', 'correct level');
                }
            };
        }
    });

    var woodchuck = getCleanTestObject(testLogglyKey, testSubDomain, testLogLevel);
    woodchuck.log(testMessage);
});

