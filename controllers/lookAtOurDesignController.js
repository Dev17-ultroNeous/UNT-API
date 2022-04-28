const multer = require("multer");
const sharp = require("sharp");
const LookAtOurDesign = require("../models/lookAtOurDesignModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            new catchAppError("Not an image! Please upload only images.", 400),
            false
        );
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadDesignPhotos = upload.single("image");

exports.resizeDesignPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `Design-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/design/${req.file.filename}`);
    next();
});

exports.lookAtOurDesign = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new catchAppError("Please enter image", 405));
    }
    if (req.file) {
        req.body.image = `${req.file.filename}`;
    }
    const data = await LookAtOurDesign.create({
        image: req.body.image,
    });
    data.image = process.env.API_URL + "/public/design/" + data.image;
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.getLookAtOurDesign = catchAsync(async (req, res, next) => {
    const data = await LookAtOurDesign.find({ isImageShow: true })
        .sort([["sequence", 1]])
        .exec();
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/design/" + el.image;
    });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.LookAtOurDesignUpdate = catchAsync(async (req, res, next) => {
    if (!req.body.id) {
        return next(new catchAppError("Please enter id", 405));
    }

    if (req.file) {
        req.body.image = `${req.file.filename}`;
    }
    const data = await LookAtOurDesign.findByIdAndUpdate(
        { _id: req.body.id },
        { image: req.body.image, type: req.body.type },
        { new: true }
    );

    data.image = process.env.API_URL + "/public/design/" + data.image;
    res.status(200).json({
        status: "success",
        data,
    });
});
