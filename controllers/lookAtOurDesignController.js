const multer = require("multer");
const sharp = require("sharp");
const LookAtOurDesign = require("../models/lookAtOurDesignModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'public/design/')
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

exports.uploadDesignPhotos = upload.single("image");



exports.lookAtOurDesign = catchAsync(async (req, res, next) => {

    const data = await LookAtOurDesign.create({
        image: req.body.image,
    });
    if (data) {
        res.redirect("./lookourdesigntable");
    }

});

exports.getLookAtOurDesign = catchAsync(async (req, res, next) => {
    const data = await LookAtOurDesign.find({ isImageShow: true }).sort([["createdAt", -1]])
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

    const data = await LookAtOurDesign.findByIdAndUpdate(
        { _id: req.body.id },
        {
            image: req.body.image,
            isImageShow: req.body.isImageShow,
            sequence: req.body.sequence
        },
        { new: true }
    );
    if (data) {
        res.redirect("./lookourdesigntable");
    }

});

exports.LookAtOurDesignDelete = catchAsync(async (req, res, next) => {

    const data = await LookAtOurDesign.findByIdAndDelete({ _id: req.params.id });


    res.status(200).json({
        status: "success",
        data,
    });
});
