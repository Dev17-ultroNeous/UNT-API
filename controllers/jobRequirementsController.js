const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const ContactUs = require("../models/contactUsModel");
const TechnologiesOfContactUs = require("../models/technologiesOfContactUsModel");
const JobRequirements = require("../models/jobRequirementsModel");
const TechnologyOfJob = require("../models/technologyOfJobRequirementModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
let alert = require('alert-node');

exports.jobRequirements = catchAsync(async (req, res, next) => {

    let value = await JobRequirements.findOne({ name: req.body.name });
    if (value) {
        return alert("This field is already added.")
    } else {
        const data = await JobRequirements.create({
            name: req.body.name,
        });
        if (data) {
            res.redirect("./jobrequirementtable");
        }
    }
});

exports.jobRequirementsDelete = catchAsync(async (req, res, next) => {
    // .findByIdAndDelete({ departmentId: req.params.id });
    const value = await TechnologyOfJob.findOneAndDelete({ departmentId: req.body.id })
    const data = await JobRequirements.findOneAndDelete({ _id: req.body.id });
    res.status(200).json({
        status: "success",
        data,
        value
    });
});
exports.jobRequirementsUpdate = catchAsync(async (req, res, next) => {
    const value = await JobRequirements.findOneAndUpdate(
        { _id: req.body.id },
        { name: req.body.name },
        { new: true }
    );
    const data = await TechnologyOfJob.findOneAndUpdate(
        { departmentId: req.body.id },
        { departmentName: req.body.name },
        { new: true }
    );
    if (data || value) {
        res.redirect("./jobtechnologytable");
    }

});

exports.technologyOfJobRequirements = catchAsync(async (req, res, next) => {
    let technologyName = req.body.technologyName;
    let count = req.body.count;
    const id = mongoose.Types.ObjectId(req.body.id);

    let value = await JobRequirements.findOne({ _id: id });
    let addData = await TechnologyOfJob.findOne({ departmentId: id });

    if (addData) {
        addData.technology.push({ technologyName, count });
        const data = await TechnologyOfJob.findOneAndUpdate(
            { departmentId: id },
            {
                fieldCount: addData.technology.length,
                technology: addData.technology,
            },
            { new: true }
        );
        if (data) {
            res.redirect("./jobtechnologytable");
        }
    } else if (value) {
        const data = await TechnologyOfJob.create({
            departmentName: value.name,
            departmentId: id,
            fieldCount: 1,
            technology: {
                technologyName: technologyName,
                count: count,
            },
        });
        if (data) {
            res.redirect("./jobtechnologytable");
        }
    } else {
        return alert("Please enter valid id.")
    }
});

exports.technologyOfJobRequirementsDelete = catchAsync(async (req, res, next) => {
    const id = req.body.id;
    const mainiId = req.body.mainiId;
    if (mainiId) {
        const data = await TechnologyOfJob.findOneAndDelete({ _id: mainiId })
        res.status(200).json({
            status: "success",
            data,
        });
    }
    let technologyId = req.body.technologyId
    let addData = await TechnologyOfJob.findOne({ departmentId: id });

    let array = addData.technology

    const checkValue = array.filter((function (el) {
        return JSON.stringify(el._id) !== JSON.stringify(technologyId);
    }));

    const data = await TechnologyOfJob.findOneAndUpdate(
        { departmentId: id },
        {
            technology: checkValue
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data,
    });
});

exports.mainTechnologyOfJobRequirementsDelete = catchAsync(async (req, res, next) => {

    const mainiId = req.body.mainiId;

    const data = await TechnologyOfJob.findOneAndDelete({ _id: mainiId })
    res.status(200).json({
        status: "success",
        data,
    });

});

exports.technologyOfJobRequirementsUpdate = catchAsync(async (req, res, next) => {
    const id = req.body.id;
    let technologyId = req.body.technologyId
    let technologyName = req.body.technologyName;
    let count = req.body.count;
    let addData = await TechnologyOfJob.findOne({ departmentId: id });

    let array = addData.technology

    const checkValue = array.filter((function (el) {
        return JSON.stringify(el._id) !== JSON.stringify(technologyId);
    }));

    checkValue.push({ technologyName, count });

    const data = await TechnologyOfJob.findOneAndUpdate(
        { departmentId: id },
        {

            technology: checkValue,
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data
    });
});



exports.getJobRequirements = catchAsync(async (req, res, next) => {
    let data = await JobRequirements.find({}).sort([["createdAt", 1]])

    let technology = await TechnologyOfJob.find({}).sort([["createdAt", 1]])
    res.status(200).json({
        data,
        technology,
    });
});

exports.contactUsData = catchAsync(async (req, res, next) => {

    const data = await ContactUs.create({
        checklist: req.body.checklist,
        hireteam: req.body.hireteam,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        budget: req.body.budget,
        message: req.body.message,
    });
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //465 is always ture//other port is false
        secure: true,
        service: "Gmail",

        auth: {
            user: "user.ultroneous@gmail.com",
            pass: "ubpbmsthrpozoiai",
        },
    });
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        }
    });
    // send mail with defined transport object
    ejs.renderFile("email.ejs", { data: data }, function (err, data) {
        const mailForAdmin = {
            from: "testnodemail@gmail.com",
            to: "user.ultroneous@gmail.com",
            subject: "Inquire",
            html: data

        };
        transporter.sendMail(mailForAdmin, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    });


    ejs.renderFile("test.ejs", { name: req.body.name }, function (err, data) {
        const mailForUser = {
            from: "testnodemail@gmail.com",
            to: req.body.email,
            subject: "Inquire",
            html: data,
        };

        transporter.sendMail(mailForUser, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

    });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.getContactUsData = catchAsync(async (req, res, next) => {
    let { page, limit } = req.query;
    const limits = parseInt(limit);
    const skip = (page - 1) * limit;
    const total_documents = await ContactUs.countDocuments();
    const data = await ContactUs.find({}).sort([["createdAt", -1]]).limit(limits).skip(skip)
    res.status(200).json({
        status: "success",
        data,
        total_documents,
    });
});

exports.technologiesOfContactUs = catchAsync(async (req, res, next) => {

    const data = await TechnologiesOfContactUs.create({
        name: req.body.name,
        type: req.body.type,
    });
    if (data) {
        res.redirect("./technologyofcontactustable");
    }
});

exports.technologiesOfContactUsDelete = catchAsync(async (req, res, next) => {
    const data = await TechnologiesOfContactUs.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
        status: "success",
        data,
    });

});

exports.technologiesOfContactUsUpdate = catchAsync(async (req, res, next) => {

    const data = await TechnologiesOfContactUs.findByIdAndUpdate({ _id: req.body.id },
        {
            name: req.params.name,
            type: req.body.type
        },
        { new: true });

    if (data) {
        res.redirect("./technologyofcontactustable");
    }

});


exports.getTechnologiesOfContactUs = catchAsync(async (req, res, next) => {
    const technology = await TechnologiesOfContactUs.find({ type: "technology" });
    const other = await TechnologiesOfContactUs.find({ type: "other" });
    res.status(200).json({
        status: "success",
        technology,
        other,
    });
});
