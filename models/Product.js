const {Schema, model} = require('mongoose');


const Product = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }

});

module.exports = model ('Product', Product)