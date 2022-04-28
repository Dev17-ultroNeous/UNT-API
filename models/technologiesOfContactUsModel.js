const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const technologiesOfContactUsSchema = new Schema({

    name: {
        type: String
    },
    type: {
        type: String,
        enum: ['technology', 'other']
    }

})



const TechnologiesOfContactUs = mongoose.model('technologiesofcontactus', technologiesOfContactUsSchema);
module.exports = TechnologiesOfContactUs

