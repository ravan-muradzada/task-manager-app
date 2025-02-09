const express = require('express');
const router = new express.Router();
const Task = require('../models/task-model');
const auth = require('../middleware/auth');

router.post('/tasks/create', auth, async (req, res) => {
    const task = new Task({...req.body, owner: req.user._id});

    try {
        await task.save();

        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(`Error happened! ${e}`);
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id}).sort({createdAt: -1});

        res.send(tasks);
    } catch(e) {
        res.status(404).send(e);
    }
})

router.delete('/tasks/clearall', auth, async (req, res) => {
    try {
        // Delete all tasks associated with the authenticated user
        const result = await Task.deleteMany({ owner: req.user._id });

        // Return success response with the number of deleted tasks
        if (result.deletedCount > 0) {
            res.status(200).send(`${result.deletedCount} tasks cleared successfully!`);
        } else {
            res.status(404).send('No tasks found to clear!');
        }
    } catch (e) {
        // Log the error and return a generic message
        console.error('Error clearing tasks:', e);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send('Task not found!');
        }
        res.send(task);
    } catch(e) {
        res.status(404).send(e);
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['name', 'description', 'completed'];
    const userUpdateRequests = Object.keys(req.body);

    const isValidUpdate = userUpdateRequests.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(404).send('Invalid update try!');
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send('Task not found!');
        }

        userUpdateRequests.forEach(update => task[update] = req.body[update]);

        await task.save();
        res.send(task);
    } catch(e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.deleteOne({_id: req.params.id});
        if (!task) {
            return res.send('Task not found!');
        }

        res.send(task);
    } catch(e) {
        res.status(404).send(e);
    }
})

router.get('/tasks/kenan', auth, (req, res) => {
    res.send('keniw')
})

router.get('/tasks/sikdir', auth, (req, res) => {
    console.log('fusijdfgsdjfgdso')

})
module.exports = router; 