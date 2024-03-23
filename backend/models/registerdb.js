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
    operator: {
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

const operatorstationSchema = new mongoose.Schema({ 
    location: {
        type: String,
        max: 255,
        trim: true
    },
    status: {
        type: Boolean,
        trim: true
    },
    slots: {
        type: Number,
        trim: true
    },
 });

 const userstationschema = new mongoose.Schema({
    EV_mod: {
        type: String,
        max: 255,
        trim: true
    },
    chargertype: {
        type: String,
        max: 1024,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    }
 });
const Registermodel = mongoose.model('register', registerSchema);
const stationmodel = mongoose.model('stations',stationschema);
const operatorstationmodel = mongoose.model('operatorstations',operatorstationSchema);
const userstationmodel = mongoose.model('userstations',userstationschema);
module.exports = {Registermodel,stationmodel,operatorstationmodel,userstationmodel};