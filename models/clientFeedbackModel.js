const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientFeedbackSchema = new Schema(
    {
        name: {
            type: String,
        },
        company: {
            type: String,
        },
        designation: {
            type: String,
        },
        image: {
            type: String,
        },
        description: {
            type: String
        }

    },
    { timestamps: true }
);
const ClientFeedback = mongoose.model("clientfeedback", clientFeedbackSchema);
module.exports = ClientFeedback;
