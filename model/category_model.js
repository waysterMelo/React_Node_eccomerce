const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    }
}, {timestamp: true});

module.exports = mongoose.model("category", categorySchema);