const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobRequirementsSchema = new Schema({

    name: {
        type: String
    },

    sequence: {
        type: Number,
        integer: true,
        default: null
    }


}, { timestamps: true })

const JobRequirements = mongoose.model('jobrequriments', jobRequirementsSchema);
module.exports = JobRequirements