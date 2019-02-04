const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.model('post', new mongoose.Schema({
  postType: String,
  title: String,
  body: {
    preview: String,
    detail: String
  },
  date: Date,
  user: mongoose.Schema.Types.ObjectId,
  category: String,
  comments: [{
    body: String,
    date: Date,
    user: mongoose.Schema.Types.ObjectId
  }]
}));