const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shortenedSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: (new Date()).getTime(),
    },
    lastUsed: {
        type: Date,
        default: null,
    }
});

module.exports = mongoose.model('urlModel', shortenedSchema)