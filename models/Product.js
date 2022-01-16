const {Schema, model} = require('mongoose');


const Product = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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

const autoPopulateCategory = function(next) {
    this.populate('category');
    next();
};

Product
    .pre('findOne', autoPopulateCategory)
    .pre('find', autoPopulateCategory);


module.exports = model ('Product', Product)