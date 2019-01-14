'use strict';
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true})

const app = express();

app.listen(8080);
app.use(session({
    secret: '!@#%^FM',
    resave: false,
    saveUninitialized: true
}));
app.use('/user', require('./user/router'));
app.use('/post', require('./post/router'));