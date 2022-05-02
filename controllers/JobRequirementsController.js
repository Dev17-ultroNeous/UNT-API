const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const ContactUs = require("../models/contactUsModel");
const TechnologiesOfContactUs = require("../models/technologiesOfContactUsModel");
const JobRequirements = require("../models/JobRequirementsModel");
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


    const data = await JobRequirements.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        data,
    });
});
exports.jobRequirementsUpdate = catchAsync(async (req, res, next) => {
    if (!req.body.id) {
        return next(new catchAppError("Please enter id", 405));
    }

    const data = await JobRequirements.findOneAndUpdate(
        { _id: req.body.id },
        { name: req.body.name },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data,
    });
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
            res.redirect("./jobrequirementtable");
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
            res.redirect("./jobrequirementtable");
        }
    } else {
        return alert("Please enter valid id.")
    }
});

exports.technologyOfJobRequirementsDelete = catchAsync(async (req, res, next) => {
    // const id = req.body.id;

    // let addData = await TechnologyOfJob.find({ departmentId: id });
    // console.log(addData);
    let data = TechnologyOfJob.find(
        { "technology.technologyName": "react" });
    console.log(data);

    res.status(200).json({
        status: "success",
        data,
    });

});



exports.getJobRequirements = catchAsync(async (req, res, next) => {
    let data = await JobRequirements.find({}).sort([["createdAt", -1]])

    let technology = await TechnologyOfJob.find({}).sort([["createdAt", -1]])
    res.status(200).json({
        data,
        technology,
    });
});

exports.contactUsData = catchAsync(async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.phone) {
        return next(new catchAppError("Please enter all the field.", 405));
    }

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
            user: "dev17.ultroneous@gmail.com",
            pass: "hkjwistmrsiqmjck",
        },
    });
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        }
    });
    // send mail with defined transport object
    const mailForAdmin = {
        from: "testnodemail@gmail.com",
        to: "ajayhadiya19@gmail.com",
        subject: "Inquire",
        html:
            "<h2 style='font-weight:bold;'>Inquire Of UNT</h2>" +

            "<tr><td style='font-weight:bold;'>Name:</td>" +
            "<td id='ids'>" +
            req.body.name +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;'>Email:</td>" +
            "<td id='ids'>" +
            req.body.email +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;' >PhoneNumber:</td>" +
            "<td id='ids'>" +
            req.body.phone +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;'>CheckList:</td>" +
            "<td id='ids'>" +
            req.body.checklist +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;'>HireTeam:</td><td id='ids'>" +
            req.body.hireteam +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;'>Budget:</td>" +
            "<td id='ids'>" +
            req.body.budget +
            "</td></tr>" +
            "<tr><td style='font-weight:bold;'>Message:</td>" +
            "<td id='ids'>" +
            req.body.message +
            "</td></tr>"

    };
    let mailForUser;

    ejs.renderFile("test.ejs", { name: req.body.name }, function (err, data) {
        mailForUser = {
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
        transporter.sendMail(mailForAdmin, (error, info) => {
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
            name: req.body.name,
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
