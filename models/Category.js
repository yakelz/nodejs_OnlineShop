const {Schema, model} = require('mongoose');

const Category = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
    }
});

module.exports = model ('Category', Category)