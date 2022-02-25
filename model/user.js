const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    fristname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    callnumber:{
        type: Number,
        required: true,
        unique: true
    },
    sex:{
        type: String,
        required: true,
        enum:["male","female"]
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createAd: {
        type : Date,
        default: Date.now
    },
    role : {
        type: String,
        enum:["admin","blogger"],
        default: "blogger"
    }

})

module.exports = mongoose.model("user",UserSchema);