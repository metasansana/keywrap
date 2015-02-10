module.exports = {


	/**
	 * use sets the keystone instance to use.
	 * @param {Object} keystone
	 * @returns {Object} `this`
	 */
	use: function(keystone) {

		this.keystone = keystone;
		return this;

	},
	/**
	 *
	 * getModel returns the model for the specified list
	 * @param {String} name
	 * @return {Model}
	 *
	 */
	getModel: function(name) {

		return this.keystone.list(name).model;

	},
	/**
	 *
	 * getDocument returns a {Document} instance for
	 * the list name passed.
	 * @param {String} name
	 * @param {Object} args
	 * @return {Document}
	 */
	getDocument: function(name, args) {

		var List = this.keystone.list(name).model;
		return new List(args);

	}
};
