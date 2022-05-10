const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({

    name: {
        type: String,
    },
    title: {
        type: String,
    },

    description: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String,
    }
}, { timestamps: true })
const Blob = mongoose.model('blog', blogSchema);
module.exports = Blob