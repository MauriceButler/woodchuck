var test = require('tape'),
    mockery = require('mockery');

mockery.registerAllowables(['../woodchuck']);
mockery.registerMock('loggly', {createClient: function(){}});

function getCleanTestObject(logglyKey, logLevel){
    mockery.enable({ useCleanCache: true, warnOnReplace: false });
    var woodchuck = require('../woodchuck')(logglyKey, logLevel);
    mockery.disable();
    return woodchuck;
}

test('woodchuck Exists', function (t) {
    t.plan(2);
    var woodchuck = getCleanTestObject();
    t.ok(woodchuck, 'woodchuck Exists');
    t.equals(typeof woodchuck, 'object',  'woodchuck is an object');
    t.end();
});

test('woodchuck Exists', function (t) {
    t.plan(2);
    var woodchuck = getCleanTestObject();
    t.ok(woodchuck, 'woodchuck Exists');
    t.equals(typeof woodchuck, 'object',  'woodchuck is an object');
    t.end();
});