function UnknownTypeError(value) {
	this.name = 'UnknownTypeError';
	this.message = 'You specified a type called ' + value+' but ' + value + ' is not a known type!';
}

UnknownTypeError.prototype = Object.create(Error.prototype);
UnknownTypeError.prototype.constructor = UnknownTypeError;

module.exports = UnknownTypeError;
