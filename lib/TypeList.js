/**
 * TypeList
 */
function TypeList() {

}

/**
 * create returns an object with the keystone types.
 * @param {Types} types
 * @return {Object}
 *
 */
TypeList.prototype.create = function(ktypes) {

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

};


module.exports = new TypeList();
