const express = require('express');
const router = new express.Router();
const User = require('../models/user-model');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = user.generateToken();
        await user.save();

        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send('Error occurred!');
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (!user) {
            console.log('User not found!')
        }
        const token = user.generateToken();
        res.send({user, token});
    } catch(e) {
        res.status(404).send(e);
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        res.send('You have logged out!');
    } catch(e) {
        res.send(e);
    }
})

router.get('/users/me', auth, (req, res) => {
    try {
        res.send(req.user);
    } catch(e) {
        res.status(401).send(e);
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password'];
    const userUpdateRequests = Object.keys(req.body);

    const isValidUpdate = userUpdateRequests.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(404).send('You cannot make these updates!');
    }

    try {
        userUpdateRequests.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();

        res.status(200).send(req.user);
    } catch(e) {
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne();
        res.send(req.user);
    } catch(e) {
        res.status(400).send(`Problem occurred! ${e}`);
    }
})
module.exports = router;