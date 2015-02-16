var must = require('must');
var keystone = require('keystone');
var def = require('./fixtures/def.js');
var Database = require('../');

before(function() {

	keystone.init();
	var Example = new keystone.List('Example', {});
	Example.add({
		name: {
			type: String
		}
	});
	Example.register();
	Database.use(keystone);

});

describe('retrival helper methods', function() {

	it('getModel() must give you a model', function() {
		Database.getModel('Example').must.exist();
	});

	it('getDocument() must give you a document', function() {
		Database.getDocument('Example').must.exist();
	});

});

describe('creation helper methods', function() {

	it('create() must work', function() {

		var model = Database.create(def);
		model.must.exist();
		model.fields.name.must.exist();
		model.fields.sku.must.exist();
		model.fields.price.must.exist();
		model.fields.owner.must.exist();
	});

});
