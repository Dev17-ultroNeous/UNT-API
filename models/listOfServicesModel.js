const mongoose = require('mongoose');
const { strategy } = require('sharp');
const Schema = mongoose.Schema;

const listOfServicesSchema = new Schema({

    name: {
        type: String,

    },
    icon: {
        type: String,

    },
    image: {
        type: String
    },
    link: {
        type: String,
    },
    description: {
        type: String,
        trim: true
    },
    longDescription: {
        type: String,
        trim: true
    }


}, { timestamps: true })
const ListOfService = mongoose.model('listofservice', listOfServicesSchema);
module.exports = ListOfService