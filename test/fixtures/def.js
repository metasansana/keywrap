module.exports = {

	name: 'Product',
	options: {
		nodelete: true
	},
	fields: {
		name: {
			type: 'string',
			default: 'name'

		},
		sku: {
			type: 'string',
			default: 'sku'
		},
		price: {
			type: 'money',
			default: '0.50',
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
};
