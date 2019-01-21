'use strict';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cors from 'cors';
import os from 'os';

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true});

const UserModel = require('./user/model');

const app = express();

app.listen(os.platform() === 'darwin' ? 8080 : 80);
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

app.use('/', express.static(__dirname + '/../public'));
app.use('/api/user', require('./user/router'));
app.use('/api/post', require('./post/router'));