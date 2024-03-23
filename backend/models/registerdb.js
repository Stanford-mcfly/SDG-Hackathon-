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
const stationschema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        trim: true
    },
    address: {
        type: String,
        max: 1024,
        trim: true  
    },
    status: {
        type: Boolean,
        trim: true
    },
    phone : {
        type: Number,
        trim: true
    },
    connectors: {
        type: String,
        trim: true
    },
    opentime: {
        type: String,
        trim: true
    }
 });
const Registermodel = mongoose.model('register', registerSchema);
const stationmodel = mongoose.model('stations',stationschema);
module.exports = {Registermodel,stationmodel};