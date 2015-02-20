
#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Wrapper module for [keystone](http://keystonejs.com) to provide a friendlier List api.

## Features
* List retrival helpers in the form of `getModel()` and `getDocument()`
* A `create()` method with an alternate List definition syntax.
* A `define()` method for storing definitions.

## Install

```sh
$ npm install --save keywrap
```

## Usage

```js
var keywrap = require('keywrap');
var definition = require('./myModel');

//Give keywrap a keystone instance to use.
keywrap.use(require('keystone'));

//Create a new model
var model = keywrap.create(definition);
model.register();

//Retrieve the model 
var model = keywrap.getModel('MyModel');
model.find().exec(callback);

//Retrieve an instance of the model.
var doc  = keywrap.getDocument('MyModel', {name:'sana'});
doc.save(callback);

```

## List Definition

Keystone has an abstraction for mongoose models called `List`. The process to define a list is a bit imperative,
so `keywrap.create()` gives takes a more of declerative
approach.

Example List definition:

```javascript
{
	name: 'Product',
	options: {
		nodelete: true
	},
	fields: {
		name: {
			type: 'string'
		},
		sku: {
			type: 'string'
		},
		price: {
			type: 'money'
		},
		owner: {
			type: 'relationship',
			ref: 'email'
		}
	},
	layout: [
		['Basic Details', '@name', '@sku', '@price'],
		['Ownership', '@owner']
	],
        run: function (model, process) {

        }

}
```

The `name`, `fields` and `layout` fields are required. `options` defaults to `{}` if not provided.

`fields` describes your model just as you would in 
plain keystone, except the `type` fields ~~must~~ can be strings
(strings are all lower case).

Keywrap will automatically replace them with the appropriate keystone type. 

The `layout` field allows you to describe how your fields should be added/grouped.
The `@` symbol refers to some field you have already defined in
`fields` and will be replaced with it.

It is a multi-dimensional array with each key having syntax:

    <layout-entry>      ::= <field-reference> | <heading>
    <field-reference>   ::= <field-prefix><fields-property>
    <field-prefix>      ::= "@"
    <fields-property>   ::= Any property decleared in the fields field.
    <heading>           ::= String
 
The `run` field is an optional function that will be ran after the fields
are added to the model. The function receives two arguments: 1) The model that was 
created 2)A process function that will convert any list definition you call it 
with. 

Example:
```javascript

  {
    run: function(model, process) {

      model.add(process({
        name:'name'
      });
    }
  }

```

## define()

The `define()` method can be used to avoid some repetitive parts of list definitions.
All it does is store some object by a key you specify. You can later use that key
in the `fields` field like follows:

```javascript
keywrap.define('custom', {type:String, default:'Foo'});
var model = keywrap.create({name:'custom'});
model.register();
```



## License

MIT © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/keywrap
[npm-image]: https://badge.fury.io/js/keywrap.svg
[travis-url]: https://travis-ci.org/metasansana/keywrap
[travis-image]: https://travis-ci.org/metasansana/keywrap.svg?branch=master
[daviddm-url]: https://david-dm.org/metasansana/keywrap.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/keywrap
