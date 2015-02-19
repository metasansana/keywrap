module.exports = {

	name: 'RunArrayProduct',
	options: {
		nodelete: true
	},
	run: [

		function(model, process) {

			model.add(process({
				name: {
                                  type: 'string',
                                  default:'Foo'
				}
			}));
		},
		function(model, process) {

			model.add(process({
				sku: {
                                  type: 'string',
                                  default:'Bar'
				}
			}));
		},
		function(model, process) {

			model.add(process({
				price: {
                                  type: 'money',
                                  default:'0.50'
				}
			}));

		}
	]
};
