const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Authentication token is missing' });
        }
        const decodedPayload = jwt.verify(token, SECRET_KEY);
        
        const user = await User.findById(decodedPayload._id);
        
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send(`Authorization problem! ${e}`);
    }
}

module.exports = auth;