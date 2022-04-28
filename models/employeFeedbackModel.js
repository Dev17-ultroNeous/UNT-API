const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeFeedbackSchema = new Schema({

    name: {
        type: String,

    },
    designation: {
        type: String,

    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true
    }

}, { timestamps: true })
const EmployeFeedback = mongoose.model('employefeedback', employeFeedbackSchema);
module.exports = EmployeFeedback