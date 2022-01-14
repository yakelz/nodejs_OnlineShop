const {Schema, model} = require('mongoose');

const Cart = new Schema ({
    userId: {
        type: String,
        required: true
    },
    products: [{
        type: Object,
        ref: 'Products'
    }]
});


module.exports = model ('Cart', Cart)