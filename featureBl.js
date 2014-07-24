
module.exports.getFeatureName = function(feature, hash){

	console.log(feature[0])

	var prevPrecent = 0;
	for(var i = 0 ; i < feature.length ; i++ ){

		var featureName = feature[i].name;
		var featurePrecent = feature[i].precent;

		if (hash >= prevPrecent && hash <= ((i+1) * featurePrecent))
			return featureName;

		prevPrecent = (i+1) * featurePrecent;
	} 
}