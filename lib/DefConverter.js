var TypeList = require('./TypeList');

var _swap = function(field, type) {

	field.type = type;
	return field;

};

/**
 * DefConverter
 */
function DefConverter() {

}

/**
 * convert takes a definition and makes it a model.
 * @param {Definition} def
 * @param {Keystone} keystone
 * @return
 */
DefConverter.prototype.convert = function(def, keystone) {

	var model = new keystone.List(def.name, def.options);
	var types = new TypeList.create(keystone.Field.Types);
	var fields = {};
	var params;
	var group;

	if (def.fields)
		for (var key in def.fields)
			if (def.fields.hasOwnProperty(key))
				fields[key] = _swap(def.fields[key], types[def.fields[key].type]);


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
			model.add.apply(model, params);

		});
	}

	return model;
};

module.exports = new DefConverter();
