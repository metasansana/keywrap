module.exports = {

	name: 'RunProduct',
	options: {
		nodelete: true
	},
	run: function(model, process) {

		model.add(process({
			name: {
                          type: 'string',
                          default:'Foo'
			},
			sku: {
                          type: 'string',
                          default:'Bar'
			},
			price: {
                          type: 'money',
                          default:'0.50'
			},
			owner: {
				type: 'relationship',
				ref: 'email'
			}
		}));

	}
};
