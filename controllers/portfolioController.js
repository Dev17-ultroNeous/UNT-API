const multer = require("multer");
const sharp = require("sharp");
const Portfolio = require("../models/portfolioModel");
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


exports.uploadPortfolioPhotos = upload.single("image");


exports.resizePortfolioPhoto = catchAsync(async (req, res, next) => {

    req.body.image = `${req.body.clientName}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/portfolio/${req.body.image}`);

    next();
});

exports.portfolioAdd = catchAsync(async (req, res, next) => {

    const data = await Portfolio.create({
        clientName: req.body.clientName,
        projectName: req.body.projectName,
        image: req.body.image,
        link: req.body.link,
        type: req.body.type,
    });
    if (data) {
        res.redirect("./portfoliotable");
    }
});
exports.getPortfolio = catchAsync(async (req, res, next) => {
    const mobileApp = await Portfolio.find({ type: "mobileapp" }).limit(8);
    const webApp = await Portfolio.find({ type: "webapp" }).limit(8);
    const platform = await Portfolio.find({ type: "platform" }).limit(8);
    const other = await Portfolio.find({ type: "other" }).limit(8);
    const allProject = await Portfolio.find({ type: "allProject" }).limit(8);
    mobileApp.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    webApp.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    platform.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    other.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    allProject.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    res.status(200).json({
        status: "success",
        data: {
            mobileApp,
            webApp,
            platform,
            other,
            allProject
        }
    });
});

exports.portfolioDelete = catchAsync(async (req, res, next) => {
    const data = await Portfolio.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.portfolioUpdate = catchAsync(async (req, res, next) => {
    const data = await Portfolio.findByIdAndUpdate(
        { _id: req.body.id },
        {
            clientName: req.body.clientName,
            projectName: req.body.projectName,
            image: req.body.image,
            link: req.body.link,
            type: req.body.type,
        },
        { new: true }
    );
    if (data) {
        res.redirect("./portfoliotable");
    }
});
