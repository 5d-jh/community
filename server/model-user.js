const mongoose = require('mongoose');

export default mongoose.model('user', new mongoose.Schema({
    username: String,
    email: String,
    administrator: Boolean,
    notifications: [{
        read: Boolean,
        body: String,
        arrivedTime: Date
    }]
}));