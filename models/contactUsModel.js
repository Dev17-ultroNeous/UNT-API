const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    checklist: {
        type: Array
    },
    hireteam: {
        type: Array
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    budget: {
        type: String
    },
    message: {
        type: String
    }


}, { timestamps: true })

const ContactUs = mongoose.model('contactus', contactUsSchema);
module.exports = ContactUs
