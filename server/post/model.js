const mongoose = require('mongoose');

module.exports = mongoose.model('post', new mongoose.Schema({
    title: String,
    body: {
        preview: String,
        detail: String
    },
    timestamp: Date,
    user: mongoose.Schema.Types.ObjectId,
    tag: String,
    comments: [{
        body: String,
        timestamp: Date,
        user: mongoose.Schema.Types.ObjectId
    }]
}));