'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Model = require('./model'); //users

const router = express.Router();

router.use(bodyParser.json());

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    Model.findOne({username, password}, (err, doc) => {
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
    Model.findById(id, (err, user) => {
        done(err, user);
    });
})

router.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const object = {username, password}
    Model.findOneAndUpdate(object, object, {upsert: true}, (err, doc) => {
        if (err) console.error(err);

        if (doc) {
            return res.status(409).json("user already exists");
        }
        res.status(200).json("user creation succeed");
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json("user login succeed");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json("user logout succeed");
});

router.get('/sessioninfo', (req, res) => {
    if (!req.session.passport) {
        return res.status(404).json("session info not found");
    }
    res.json({
        userid: req.session.passport.user
    });
});

module.exports = router;