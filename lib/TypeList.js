/**
 * TypeList
 * @param {Types} ktypes
 */
function TypeList(ktypes) {

	this.types = {
		string: String,
		number: Number,
		boolean: Boolean
	};

	for (var key in ktypes)
		if (ktypes.hasOwnProperty(key))
			this.types[key.charAt(0).toLowerCase() + key.substring(1)] =
			ktypes[key];


}

TypeList.prototype.set = function(key, type) {

	this.types[key.toLowerCase()] = type;

};

TypeList.prototype.get = function() {

	return this.types;

};

module.exports = TypeList;
