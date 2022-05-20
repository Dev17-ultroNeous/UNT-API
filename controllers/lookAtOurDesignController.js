const multer = require("multer");
const sharp = require("sharp");
const LookAtOurDesign = require("../models/lookAtOurDesignModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadDesignPhotos = upload.single("image");

exports.resizeDesignPhoto = catchAsync(async (req, res, next) => {

    req.body.image = `${req.body.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)

        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/design/${req.body.image}`);

    next();
});

exports.lookAtOurDesign = catchAsync(async (req, res, next) => {

    const data = await LookAtOurDesign.create({
        name: req.body.name,
        image: req.body.image,
    });
    if (data) {
        res.redirect("./lookourdesigntable");
    }

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
