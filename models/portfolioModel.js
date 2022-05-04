const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({

    clientName: {
        type: String,
    },
    projectName: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String,
    },
    type: {
        type: String,
    },



}, { timestamps: true })
const Portfolio = mongoose.model('portfolio', portfolioSchema);
module.exports = Portfolio