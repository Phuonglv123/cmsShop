const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
//load model

const User = require('../models/user');

router.post('/register', (req, res, next) => {
    User.findOne({username: req.body.username}).then(user => {
        if (user) return res.status(400).json({error: 'can not create user'})
        const newUsers = new User({...req.body});
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return console.log(err);
            bcrypt.hash(newUsers.password, salt, (e, hash) => {
                if (e) return console.log(e);
                newUsers.password = hash;
                newUsers.save().then(users => {
                    return res.status(200).json({users})
                }).catch(e => {
                    return res.status(400).json({error: 'server is not found'})
                })
            })
        })
    }).catch(e => {
        return res.status(400).json({error: 'server is not found'})
    })
})

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) return res.status(400).json({error: "username or password is wrong "})
            bcrypt.compare(req.body.password, user.password).then(
                isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            username: user.username,
                            fullName: user.fullName,
                            emaill: user.email
                        };
                        jwt.sign(
                            payload,
                            config.secretKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.status(200).json({payload, token})
                            }
                        )
                    } else {
                        return res.status(400).json({
                            'errors': {
                                code: 400,
                                message: null,
                                detail: {
                                    globalErrors:
                                        "Unable to log in with provided credentials."
                                }
                            }
                        })
                    }
                }).catch((e) => {
                return res.status(401).json(e)
            })
        }).catch((e) => {
        return res.status(400).json(e)
    })
})

module.exports = router;
