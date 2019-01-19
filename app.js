'use strict';
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true});

const UserModel = require('./user/model');

const app = express();

app.listen(8080);
app.use(cors());

app.use(session({
    secret: '!@#%^FM',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    UserModel.findOne({username, password}, (err, doc) => {
        if (err) return done(err);
        
        if (!doc) {
            return done(null, false, {message: "user not exists"});
        }
        return done(null, doc);
    });
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

app.use('/user', require('./user/router'));
app.use('/post', require('./post/router'));