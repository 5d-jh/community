'use strict';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import cors from 'cors';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import os from 'os';
import process from 'process';

import UserRouter from './user/router';
import PostRouter from './post/router';

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true});

import UserModel from './user/model';

const app = express();

const port = os.platform() === 'darwin' ? 8080 : 80;

if (process.env.NODE_ENV === 'development') {
    const compiled = webpack(require('../webpack.dev.config'));
    const devServer = new WebpackDevServer(compiled, {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            '**': 'http://localhost:' + port
        }
    });
    devServer.listen(3000, () => {
        console.log('http://localhost:3000');
    })
}

app.listen(port);
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
app.use('/api/user', UserRouter);
app.use('/api/post', PostRouter);