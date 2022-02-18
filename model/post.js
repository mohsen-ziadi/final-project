const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Number
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model("post", postSchema);