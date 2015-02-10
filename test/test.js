var must = require('must');
var keystone = require('keystone');
var Database = require('../');

before(function() {

keystone.init();
var Example = new keystone.List('Example', {});
Example.add({name:{type: String}});
Example.register();
Database.use(keystone);

});

describe('keywrap node module', function () {

  it('must give you a model', function () {
    Database.getModel('Example').must.exist();
  });

  it('must give you a document', function () {
    Database.getDocument('Example').must.exist();
  });

});
