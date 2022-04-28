const mongoose = require("mongoose");
const JobRequirements = require("./JobRequirementsModel");
const Schema = mongoose.Schema;

const technologyOfJobSchema = new Schema(
    {
        departmentName:
        {
            type: String

        },
        departmentId:
        {
            type: mongoose.Schema.Types.ObjectId,

        },
        fieldCount: {
            type: String
        },
        technology: [
            {
                technologyName: String,
                count: Number
            }
        ]


    },
    { timestamps: true }
);

const TechnologyOfJob = mongoose.model("technologyofjob", technologyOfJobSchema);
module.exports = TechnologyOfJob;
