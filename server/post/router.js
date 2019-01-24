'use strict';
import express from 'express';
import bodyParser from 'body-parser';

export default function(io) {
    const Model = require('./model');

    const router = express.Router();

    router.use(bodyParser.json());

        router.post('/create', (req, res) => {
            if (!req.session.passport) {
                return res.status(403).json("session info not found");
            }
    
            const postBody = req.body.body;
            let omittedArray = postBody.split(' ');
            if (omittedArray.length > 0) {
                omittedArray = omittedArray.slice(0, 10);
            }
    
            let omittedString = '';
            for (const i in omittedArray) {
                omittedString += omittedArray[i] + ' ';
            }
    
            if (omittedString.length > 121) {
                omittedString = omittedString.slice(0, 120);
            }
    
            const doc = {
                title: req.body.title,
                body: {
                    preview: omittedString,
                    detail: req.body.body
                },
                timestamp: new Date(),
                user: req.session.passport.user
            };
            Model.create(doc, (err) => {
                if (err) console.error(err);

                io.on('connection', () => {
                    io.emit('new-post-update', doc.title);
                });
                
                res.status(200).json("post succefully submitted");
        });
    });
    

    router.post('/comment/:postId', (req, res) => {
        if (!req.session.passport) {
            return res.status(403).json("forbidden");
        }

        Model.findByIdAndUpdate(req.params.postId, {
            $push: {
                comments: {
                    body: req.body.body,
                    timestamp: new Date(),
                    user: req.session.passport.user
                }
            }
        }, (err) => {
            if (err) console.error(err);
            
            res.status(200).json("comment succefully submitted");
        });
    });

    router.get('/comments/:postId', (req, res) => {
        const projection = {
            comments: true
        };
        Model.findById(req.params.postId, projection, (err, comments) => {
            if (err) console.error(err);

            res.status(200).json(comments ? comments.comments : []);
        });
    });

    router.get('/recent/:range', (req, res) => {
        const range = req.params.range.split('-');
        if (range.length != 2) {
            return res.status(400).json("range not specified properly");
        }
        range[0] = parseInt(range[0]);
        range[1] = parseInt(range[1]);
        Model.find({}, null, {skip: range[1], limit: range[0]}).lean().exec((err, docs) => {
            if (err) console.error(err);

            res.json(docs.reverse());
        });

        Model.find({}, null, {skip: range[1], limit: range[0]}, (err, docs) => {
            
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

    return router;
}