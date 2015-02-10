#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Wrapper around keystone for easier list retrival. 

I made module because I was getting tired of doing `keystone.list('Model').model` and 
so on.

## Install

```sh
$ npm install --save keywrap
```

## Usage

```js
var Database = require('keywrap');

Database.use(require('keystone'));

//As model
var model = Database.getModel('MyModel');
model.find().exec(callback);

//As Document
var doc  = Database.getDocument('MyModel', {name:'sana'});
doc.save(callback);

```


## License

MIT © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/keywrap
[npm-image]: https://badge.fury.io/js/keywrap.svg
[travis-url]: https://travis-ci.org/metasansana/keywrap
[travis-image]: https://travis-ci.org/metasansana/keywrap.svg?branch=master
[daviddm-url]: https://david-dm.org/metasansana/keywrap.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/keywrap
