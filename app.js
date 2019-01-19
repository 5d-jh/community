'use strict';
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true})

const app = express();

app.listen(8080);
app.use(cors());
app.use(session({
    secret: '!@#%^FM',
    resave: false,
    saveUninitialized: true
}));
app.use('/user', require('./user/router'));
app.use('/post', require('./post/router'));