const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task-model');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email!');
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('User not found!');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login!');
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;

    return userObj;
}
userSchema.methods.generateToken = function() {
    const user = this;
    let privateKey = process.env.SECRET_KEY;
    privateKey = 'somePrivateKey'
    const token = jwt.sign({_id: user._id.toString()}, privateKey, { expiresIn: '1d' });

    return token;
}

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) { 
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

userSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
    const user = this;

    await Task.deleteMany({owner: user._id});
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;