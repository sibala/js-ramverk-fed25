const mongoose = require('mongoose');

// The only categories a pun can have
const CATEGORIES = ['animals', 'education', 'everyday', 'food', 'history', 'music', 'science', 'sports', 'technology'];

const PunSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: CATEGORIES        // Any other category gives a validation error
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Puns', PunSchema);
module.exports.CATEGORIES = CATEGORIES;
