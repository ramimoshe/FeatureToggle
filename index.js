require('./extentions');

var Hapi = require('hapi');
var featureBl = require('./featureBl');
var dal = require('./dal');

var srvaddr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var srvport = process.env.OPENSHIFT_NODEJS_PORT || 1234;

var server = new Hapi.Server(srvaddr, srvport);
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
            if (!feature)
            {
                reply("the featureName was not found").code(404);
                return;
            }
			var res = featureBl.getFeatureName(feature, hash);
			reply(res);
        }
    });

server.start(); 
console.log("The server is running on " + server.info.uri  + " ...");
