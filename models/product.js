const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    unitAmount: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    }
}, {timestamps: true})
module.exports = Products = mongoose.model('Products', ProductSchema);

