'use strict';
import mongoose from 'mongoose';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import session from 'express-session';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
// import LocalStrategy from 'passport-local';
import cors from 'cors';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import os from 'os';
import process from 'process';
import gql from 'graphql-tag';

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true});

import UserModel from './model-user';

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
    });
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

passport.use(new GoogleStrategy({
    clientID: '855484911033-42vo7avuk3en1e832v3t3b9bhre9t3o9.apps.googleusercontent.com',
    clientSecret: 'OfvFKyo7Sri9i5SCkBiOU91e',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    const googleUser = {
        username: profile.displayName,
        email: profile.emails[0].value,
        administrator: false
    };
    UserModel.findOneAndUpdate(googleUser, googleUser, {upsert: true}, (err, user) => {
        return done(err, user);
    })
}));
passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

// import { Query } from './resolvers';

const schema = buildSchema(`
    type Comment {
        body: String!,
        timestamp: String!,
        user: String!
    }

    type PostBody {
        preview: String,
        detail: String!
    }

    type UserBody {
        username: String!
    }
    
    type Post {
        _id: String
        title: String,
        body: PostBody,
        user: String,
        tag: String,
        comments: [Comment] 
    }

    type Query {
        postsByRecent(range: String!): [Post]!
        post(id: String!): Post
        userSessionInfo: UserBody
    }

    type Mutation {
        createPost(
            title: String!, 
            body: String!
        ): Boolean!

        createComment(postId: String!): Boolean!

        createUser(
            username: String!,
            password: String!
        ): Boolean!
    }
`);

import resolvers from './resolvers';

app.use('/', express.static(__dirname + '/../public'));
app.use('/api', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'development',
}));
app.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'email'
    ]
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/',
    successRedirect: 'http://localhost:3000/'
}));
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})