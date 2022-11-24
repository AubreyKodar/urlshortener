const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shortenedSchema = new Schema({
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
        required: true,
    },
    lastUsed: {
        type: Date,
    }
});

module.exports = mongoose.model('Shortened', shortenedSchema)