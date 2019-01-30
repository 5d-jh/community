const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('post', new mongoose.Schema({
  postId: String,
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