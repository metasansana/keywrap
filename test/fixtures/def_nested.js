module.exports = {

	name: 'Customer',
	options: {
		nodelete: true
	},
	fields: {

		name: {
			type: 'string'
		},
		address: {

			billing: {
				street1: {
                                  type: 'string',
                                  default:'Street 1',
				}
			},
			shipping: {
				street1: {
                                  type: 'string',
                                  default:'Street 1',
                                },
                                phone: {

                                  line1:{type:'string'},
                                  ext:{type:'string'}


                                }
			}

		}

	},
	layout: [
		['@name', '@address']
	],
};
