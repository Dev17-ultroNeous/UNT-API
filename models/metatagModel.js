const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaTagSchema = new Schema(
    {
        title: {
            type: String,
        },

        metaTag: {
            type: String,
        },
        pageName: {
            type: String,
        },
    },
    { timestamps: true }
);
const MetaTag = mongoose.model("metaTag", metaTagSchema);
module.exports = MetaTag;
