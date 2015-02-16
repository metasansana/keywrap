
#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Wrapper module for [keystone](http://keystonejs.com) to provide friendlier List api.

## Features
* List retrival helpers in the form of `getModel()` and `getDocument()`
* A `create()` method with alternate List definition syntax.

## Install

```sh
$ npm install --save keywrap
```

## Usage

```js
var Keywrap = require('keywrap');
var myModel = require('./myModel');

//Give keywrap a keystone instance to use.
Keywrap.use(require('keystone'));

//Create a new model
var model = Keywrap.create(myModel);
model.register();

//Retrieve the model 
var model = Keywrap.getModel('MyModel');
model.find().exec(callback);

//Retrieve an instance of the model.
var doc  = Keywrap.getDocument('MyModel', {name:'sana'});
doc.save(callback);

```

## List Definition

Keystone has an abstraction for mongoose models called `List`. The process to define a list is a bit imperative,
so `keywrap.create()` gives it a more of a declerative
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
	]

}


```

The `name`, `fields` and `layout` fields are required. `options` defaults to `{}` if not provided.

`fields` describes your model just as you would in 
plain keystone, except the `type` fields must be strings (in common letters too).

Keywrap will automatically replace them with the appropriate keystone type. The `layout` field allows you
to describe how your fields should be added/grouped.

It is a multi-dimensional array with each key having syntax:

    <layout-entry>      ::= <field-reference> | <heading>
    <field-reference>   ::= <field-prefix><fields-property>
    <field-prefix>      ::= "@"
    <fields-property>   ::= Any property decleared in the fields field.
    <header>            ::= String
 

In other words, the members of each member of `layout`
must be a string, if prefixed with `@` it is treated as a reference to a property of the `fields` property. Otherwise it is treated as a plain string that keystone
will use as a heading.



## License

MIT © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/keywrap
[npm-image]: https://badge.fury.io/js/keywrap.svg
[travis-url]: https://travis-ci.org/metasansana/keywrap
[travis-image]: https://travis-ci.org/metasansana/keywrap.svg?branch=master
[daviddm-url]: https://david-dm.org/metasansana/keywrap.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/keywrap
