'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const Model = require('./model');

const router = express.Router();

router.use(bodyParser.json());

router.use(passport.initialize());
router.use(passport.session());

router.post('/create', (req, res) => {
    if (!req.session.passport) {
        return res.status(403).json("session info not found");
    }
    const doc = {
        title: req.body.title,
        body: req.body.body,
        timestamp: new Date(),
        user: req.session.passport.user
    };
    Model.create(doc, (err) => {
        if (err) console.error(err);

        res.status(200).json("post succefully submitted");
    });
});

router.get('/recent/:range', (req, res) => {
    const range = req.params.range.split('-');
    if (range.length != 2) {
        return res.status(400).json("range not specified properly");
    }
    range[0] = parseInt(range[0]);
    range[1] = parseInt(range[1]);
    Model.find({}, null, {skip: range[0], limit: range[1]}, (err, docs) => {
        if (err) console.error(err);

        res.json(docs);
    });
});

router.get('/:id', (req, res) => {
    Model.findById(req.params.id, (err, post) => {
        if (err) console.error(err);

        res.json(post);
    });
});

router.delete('/:postId', (req, res) => {
    if (!req.session.passport) {
        return res.status(403).json("session info not found");
    }
    const condition = {
        _id: req.params.postId,
        user: req.session.passport.user
    };
    Model.findOneAndDelete(condition, (err, doc) => {
        if (err) console.error(err);
        
        if (!doc) {
            return res.status(403).json("forbidden");
        }
        res.status(200).json("post deletion succeed");
    });
});

module.exports = router;