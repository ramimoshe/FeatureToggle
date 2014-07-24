var db = {
	"landPage":[
		{
			"name" : "lanA",
			"precent" : 30
		},
		{
			"name" : "lanB",
			"precent" : 50
		},
		{
			"name" : "lanC",
			"precent" : 20
		}
	],
	"editApp":[
		{
			"name" : "redA",
			"precent" : 60
		},
		{
			"name" : "Bluec",
			"precent" : 40
		}
	]
}


module.exports.getFeature = function(baseFeatureName){
	return db[baseFeatureName];
}

module.exports.getAllFeatures = function(){
	return db;
}