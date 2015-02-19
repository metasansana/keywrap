var must = require('must');
var keystone = require('keystone');
var def = require('./fixtures/def.js');
var def_nested = require('./fixtures/def_nested');
var def_schema = require('./fixtures/def_schema');
var keywrap = require('../');

before(function() {

	keystone.init();
	var Example = new keystone.List('Example', {});
	Example.add({
		name: {
			type: String
		}
	});
	Example.register();
	keywrap.use(keystone);

});

describe('retrival helper methods', function() {

	it('getModel() must give you a model', function() {
		keywrap.getModel('Example').must.exist();
	});

	it('getDocument() must give you a document', function() {
		keywrap.getDocument('Example').must.exist();
	});

});

describe('creation helper methods', function() {

	it('create() must work', function() {

		var model = keywrap.create(def);
		model.must.exist();
		model.fields.name.must.exist();
		model.fields.sku.must.exist();
		model.fields.price.must.exist();
		model.fields.owner.must.exist();
	});

	it('create() must work with nested fields', function() {

		keywrap.create(def_nested).register();

		var model = keywrap.getDocument('Customer');
		model.must.exist();
		model.address.must.exist();
		model.address.billing.must.exist();
		model.address.shipping.must.exist();
		model.address.shipping.phone.must.exist();

	});

	it('create() must add schemas', function() {

		keywrap.create(def_schema).register();
		var model = keywrap.getDocument('Produce');
		model.must.exist();
		model.tags.must.exist();
		model.keywords.must.exist();


	});

});
