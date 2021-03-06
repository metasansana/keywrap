module.exports = {

	name: 'Produce',
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
	schema: [{
		tags: []
	}, {
		keywords: []
	}]
};
