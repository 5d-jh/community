const mongoose = require('mongoose');

export default mongoose.model('post', new mongoose.Schema({
    title: String,
    body: String,
    timestamp: Date,
    user: mongoose.Schema.Types.ObjectId,
    category: String,
    comments: [{
        body: String,
        timestamp: Date,
        user: mongoose.Schema.Types.ObjectId
    }]
}));