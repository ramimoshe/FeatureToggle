require('./extentions');

var Hapi = require('hapi');
var featureBl = require('./featureBl');
var dal = require('./dal');


var server = new Hapi.Server('localhost', 1234);
var baseAddress = '/api'

server.views({
        engines: {
            html: require('handlebars')
        },
        path: __dirname + '/views'
    });

server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
        	reply.view('index')
        }
    });

server.route({
        method: 'GET',
        path: baseAddress + '/TestResult/{featureName}/{userId}',
        handler: function (request, reply) {
        	console.log(request.params);
    		var compositKey = request.params.featureName + "_" + request.params.userId
			var hash = compositKey.hashCode() %100
			var feature = dal.getFeature(request.params.featureName);
			var res = featureBl.getFeatureName(feature, hash);
			reply(res);
        }
    });

server.start(); 
console.log("The server is running on " + server.info.uri  + " ...");
