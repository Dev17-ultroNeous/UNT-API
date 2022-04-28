
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookAtOurDesignSchema = new Schema({
    image: {
        type: String
    },
    isImageShow: {
        type: Boolean,
        default: true
    },
    sequence: {
        type: Number
    }
})

const LookAtOurDesign = mongoose.model('lookAtOurDesign', lookAtOurDesignSchema);
module.exports = LookAtOurDesign