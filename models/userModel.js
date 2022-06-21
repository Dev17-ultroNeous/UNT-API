const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    inquiryPassword: {
        type: String
    },
    phone: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'bloger'],
        default: 'user'
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema);
module.exports = User