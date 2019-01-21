'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const Model = require('./model'); //users

const router = express.Router();

router.use(bodyParser.json());

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

    const projection = {
        username: true
    };
    Model.findById(req.session.passport.user, projection, (err, user) => {
        if (err) console.error(err);

        res.status(200).json(user);
    });
});

module.exports = router;