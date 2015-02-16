var DefConverter = require('./DefConverter');
/**
 * Keywrap
 */
function Keywrap() {}


/**
 * use sets the keystone instance to use.
 * @param {Object} keystone
 * @returns {Object} `this`
 */
Keywrap.prototype.use = function(keystone) {

	this.keystone = keystone;
	return this;

};

/**
 *
 * getModel returns the model for the specified list
 * @param {String} name
 * @return {Model}
 *
 */
Keywrap.prototype.getModel = function(name) {

	return this.keystone.list(name).model;

};

/**
 *
 * getDocument returns a {Document} instance for
 * the list name passed.
 * @param {String} name
 * @param {Object} args
 * @return {Document}
 */
Keywrap.prototype.getDocument = function(name, args) {

	var List = this.keystone.list(name).model;
	return new List(args);

};

/**
 * create a model based on the definition given.
 *
 * @param {Object} def
 * @return
 *
 */
Keywrap.prototype.create = function(def) {
	return DefConverter.convert(def, this.keystone);
};


module.exports = Keywrap;
