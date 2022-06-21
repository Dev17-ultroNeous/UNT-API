const multer = require("multer");
const sharp = require("sharp");
const ClientFeedback = require("../models/clientFeedbackModel");
const EmployeFeedback = require("../models/employeFeedbackModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'public/users/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${req.body.name}` + '-' + Date.now()
        req.body.image = uniqueSuffix + file.originalname;
        cb(null, uniqueSuffix + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            req.imageValid = true;
            cb(null, true);
        } else {
            req.imageValid = false;
            cb(null, false);
        }
    }
});
exports.uploadUserPhotos = upload.single("image");

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {

//     if (!req.file) return next();
//     req.file.filename = `${req.body.name}-${Date.now()}.jpeg`;

//     await sharp(req.file.buffer)
//         .resize(149, 149, {
//             fit: sharp.fit.contain,
//             background: { r: 0, g: 0, b: 0, alpha: 0 }
//         })
//         .flatten({
//             background: '#ffffff'
//         })
//         .toFormat("png")
//         .png({ quality: 100 })
//         .toFile(`public/users/${req.file.filename}`);

//     next();
// });

exports.clientFeedback = catchAsync(async (req, res, next) => {
    if (
        !req.body.name ||
        !req.body.company ||
        !req.body.designation ||
        !req.body.description
    ) {
        return next(new catchAppError("Please enter all the fields", 405));
    }


    const data = await ClientFeedback.create({
        name: req.body.name,
        company: req.body.company,
        designation: req.body.designation,
        image: req.body.image,
        description: req.body.description,
    });

    data.image = process.env.API_URL + "/public/users/" + data.image;
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.employeFeedback = catchAsync(async (req, res, next) => {

    const data = await EmployeFeedback.create({
        name: req.body.name,
        designation: req.body.designation,
        image: req.body.image,
        description: req.body.description,
    });
    data.image = process.env.API_URL + "/public/users/" + data.image;
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.getClientFeedbacks = catchAsync(async (req, res, next) => {
    let { page, limit } = req.query;
    const limits = parseInt(limit);
    const skip = (page - 1) * limit;
    const total_documents = await ClientFeedback.countDocuments();
    const data = await ClientFeedback.find({}).sort([["createdAt", -1]]).limit(limits).skip(skip)
        .exec();

    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image;
    });
    res.status(200).json({
        status: "success",
        data,
        total_documents,
    });
});

exports.getEmployeFeedbacks = catchAsync(async (req, res, next) => {
    let { page, limit } = req.query;
    const limits = parseInt(limit);
    const skip = (page - 1) * limit;
    const total_documents = await EmployeFeedback.countDocuments();
    const data = await EmployeFeedback.find({}).sort([["createdAt", -1]]).limit(limits).skip(skip)
        .exec();
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image;
    });
    res.status(200).json({
        status: "success",
        data,
        total_documents,
    });
});

exports.clientFeedbackDelete = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await ClientFeedback.findByIdAndDelete({ _id: id });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.clientFeedbackUpdate = catchAsync(async (req, res, next) => {
    const id = req.params.id

    const data = await ClientFeedback.findByIdAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            company: req.body.company,
            designation: req.body.designation,
            image: req.body.image,
            description: req.body.description,
        },
        { new: true },
    );

    res.status(200).json({
        status: "success",
        data,
    });
});

exports.employeFeedbackDelete = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const data = await EmployeFeedback.findByIdAndDelete({ _id: id });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.employeFeedbackUpdate = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const data = await EmployeFeedback.findByIdAndUpdate(
        { _id: id },
        {
            name: req.body.name,
            designation: req.body.designation,
            image: req.body.image,
            description: req.body.description,
        },
        { new: true },
    );

    res.status(200).json({
        status: "success",
        data,
    });
});
