'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.connect('mongodb://localhost/community', {useNewUrlParser: true})
const Model = require('./model'); //users

const router = express.Router();

router.use(bodyParser.json());
router.use(session({
    secret: '!@#%^FM',
    resave: false,
    saveUninitialized: true
}));

router.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Model.create({username, password}, (err) => {
        if (err) console.error(err);

        res.status(200).json('user creation succeed');
    });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    Model.findOne({username, password}, (err, data) => {
        if (err) console.error(err);
        
        if (!data) {
            return res.status(401).json("user login failed");
        }

        req.session.username = username;
        req.session.password = password;
        res.status(200).json("user login succeed");
    });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.error(err);

        res.status(200).json("user logout succeed");
    });
});

router.get('/sessioninfo', (req, res) => {
    res.json({
        username: req.session.username,
        password: req.session.password
    });
});

module.exports = router;