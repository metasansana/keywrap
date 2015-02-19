var TypeList = require('./TypeList');

function _isObject(o) {
	return typeof o === 'object';
}

function _isFunction(f) {
	return typeof arg === 'function';
}

function _isString(s) {
	return typeof s === 'string';
}

function _clone(o) {

	var dolly = {};

	if (!_isObject(o))
		return o;

	for (var key in o)
		if (o.hasOwnProperty(key))
			dolly[key] = (_isObject(o[key])) ? _clone[key] : o[key];

	return dolly;

}

function _swap(target, type) {
	var o = _clone(target);
	o.type = type;
	return o;

}

//Go through the fields key and convert the 'type' key of any objects found.
var _process = function(fields, types) {

	var current;
	var converted = {};

	for (var key in fields)
		if (fields.hasOwnProperty(key)) {

			current = fields[key];

			if (_isString(current))
				converted[key] = types[current.type];

			if (_isString(current.type))
				converted[key] = _swap(current, types[current.type]);

			if (_isFunction(current.type))
				converted[key] = _swap(current, current.type);

			if (_isObject(current))
				if (!_isString(current.type))
					converted[key] = _process(current, types);

		}


	return converted;


};

/**
 * DefConverter
 */
function DefConverter() {}

/**
 * convert takes a definition and makes it a model.
 * @param {Definition} def
 * @param {Keystone} keystone
 * @return
 */
DefConverter.prototype.convert = function(def, keystone) {

	var model = new keystone.List(def.name, def.options);
	var types = new TypeList.create(keystone.Field.Types);
	var params;
	var group;
	var fields;
	var schema;

	if (def.fields)
		fields = _process(def.fields, types);



	if (!Array.isArray(def.layout)) {

		model.add(fields);

	} else {

		def.layout.forEach(function(layout) {
			params = [];
			group = {};
			layout.forEach(function(param) {

				if (param[0] === '@') {
					group[param.substring(1)] =
						fields[param.substring(1)];
				} else {
					params.push(param);
				}
			});

			params.push(group);

			if (def.defaultColumns)
				model.defaultColumns = def.defaultColumns;

			model.add.apply(model, params);

			if (def.schema)
				for (var key in def.schema)
					if (def.schema.hasOwnProperty(key))
						model.schema.add(def.schema[key]);

		});
	}

	return model;
};

module.exports = new DefConverter();
