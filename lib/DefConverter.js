var TypeList = require('./TypeList');

function _isObject(o) {
	if (Array.isArray(o))
		return false;
	return typeof o === 'object';
}

function _isFunction(f) {
	return typeof f === 'function';
}

function _isString(s) {
	return typeof s === 'string';
}

function _isPrimitive(p) {

	if (_isObject(p))
		return false;

	if (_isFunction(p))
		return false;

	if (Array.isArray(p))
		return false;

	return true;

}

function _cloneArray(a) {

	var r = [];

	a.forEach(function(each) {
		r.push(each);
	});

	return r;

}

function _clone(o) {

	var dolly = {};

	if (!_isObject(o))
		return o;

	for (var key in o)
		if (o.hasOwnProperty(key)) {

			if (Array.isArray(o[key]))
				dolly[key] = _cloneArray(o[key]);

			if (_isObject(o[key]))
				dolly[key] = _clone(o[key]);

			if (_isPrimitive(o[key]))
				dolly[key] = o[key];
		}

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

	if (_isString(fields))
		converted = types[fields];

	if (_isObject(fields))
		for (var key in fields)
			if (fields.hasOwnProperty(key)) {

				current = fields[key];

				if (_isString(current))
					converted[key] = types[current];

				if (_isString(current.type))
					converted[key] = _swap(current, types[current.type]);

				if (_isFunction(current.type))
					converted[key] = _swap(current, current.type);

				if (_isObject(current))
					if (!_isString(current.type))
						converted[key] = _process(current, types);

                        }

                        if(Array.isArray(fields))
                          converted = fields.map(function(field) {
                            return _process(field, types);
                          });


	return converted;


};

/**
 * DefConverter
 * @param {Keystone} keystone
 */
function DefConverter(keystone) {

	this.keystone = keystone;
	this.types = new TypeList(keystone.Field.Types);

}

/**
 * convert takes a definition and makes it a model.
 * @param {Definition} def
 * @return
 */
DefConverter.prototype.convert = function(def) {

	var model = new this.keystone.List(def.name, def.options);
	var types = this.types.get();
	var params;
	var group;
	var fields;
	var schema;

	if (def.fields)
		fields = _process(def.fields, types);

	if (!Array.isArray(def.layout)) {

		if (def.fields)
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

	if (def.run) {

		var process = function(fields) {

			return _process(fields, types);
		};

		if (_isFunction(def.run))
			def.run(model, process);

		if (Array.isArray(def.run))
			def.run.forEach(function(each) {
				each(model, process);
			});


	}

	return model;
};

module.exports = DefConverter;
