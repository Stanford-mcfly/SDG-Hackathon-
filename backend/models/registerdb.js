const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 1024,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        trim: true
    },
    opertor: {
        type: Boolean,
        required: true,
        trim: true
    },
},{timestamps: true});
const Registermodel = mongoose.model('Register', registerSchema);
module.exports = Registermodel;