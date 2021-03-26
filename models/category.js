const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
}, {timestamps: true})
module.exports = Categories = mongoose.model('Categories', CategorySchema);

