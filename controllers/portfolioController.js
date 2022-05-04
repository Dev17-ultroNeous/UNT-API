const multer = require('multer')
const sharp = require("sharp");
const Portfolio = require("../models/portfolioModel")
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/portfolio/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${req.body.clientName}-${Date.now()}`;
        req.body.image = uniqueSuffix + '-' + file.originalname;
        cb(null, uniqueSuffix + '-' + file.originalname)
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
exports.uploadPortfolioPhotos = upload.single("image");


exports.portfolioAdd = catchAsync(async (req, res, next) => {

    const data = await Portfolio.create({
        clientName: req.body.clientName,
        projectName: req.body.projectName,
        image: req.body.image,
        link: req.body.link,
        type: req.body.type,

    });
    if (data) {
        res.redirect('./portfoliotable')
    }
});
exports.getPortfolio = catchAsync(async (req, res, next) => {
    const mobileApp = await Portfolio.find({ type: "mobileapp" }).limit(8);
    const webApp = await Portfolio.find({ type: "webapp" }).limit(8);
    const platform = await Portfolio.find({ type: "platform" }).limit(8);
    const other = await Portfolio.find({ type: "other" }).limit(8);

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

    res.status(200).json({
        status: "success",
        mobileApp,
        webApp,
        platform,
        other
    });
});
