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

	this.converter = new DefConverter(keystone);
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
	return this.converter.convert(def);
};


/**
 * define a type that can be used later.
 *
 * When you define a type, all this does is store the value passed
 * at key you specified. You can later use this type like this: {fields:{myType:'myType'}}
 * @param {String} key
 * @param {String} value
 *
 */
Keywrap.prototype.define = function(key, value) {

	this.converter.types.set(key, value);

};


module.exports = Keywrap;
