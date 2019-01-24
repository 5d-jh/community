const mongoose = require('mongoose');

export default mongoose.model('user', new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    administrator: Boolean
}));