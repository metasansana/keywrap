/**
 * TypeList
 * @param {Types} ktypes 
 */
function TypeList(ktypes) {
  
	var types = {
		string: String,
		number: Number,
		boolean: Boolean
	};

	for (var key in ktypes)
		if (ktypes.hasOwnProperty(key))
			types[key.charAt(0).toLowerCase() + key.substring(1)] =
			ktypes[key];
	return types;


}

module.exports = TypeList;
