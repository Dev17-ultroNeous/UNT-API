const multer = require('multer')
const sharp = require("sharp");
const ListOfServices = require("../models/listOfServicesModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/service/')
    },
    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now()
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
exports.uploadServicePhotos = upload.single("image");


exports.listOfServices = catchAsync(async (req, res, next) => {

    const data = await ListOfServices.create({
        name: req.body.name,
        image: req.body.image,
        link: req.body.link,
        icon: req.body.icon,
        description: req.body.description,

    });
    if (data) {
        res.redirect("./listofservicetable");
    }
});
exports.getListOfServices = catchAsync(async (req, res, next) => {
    const data = await ListOfServices.find({}).sort([["createdAt", -1]])
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/service/" + el.image;
    });

    res.status(200).json({
        status: "success",
        data,
    });
});

exports.ListOfServicesDelete = catchAsync(async (req, res, next) => {
    const data = await ListOfServices.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
        status: "success",
        data,
    });
});
exports.ListOfServicesUpdate = catchAsync(async (req, res, next) => {

    const data = await ListOfServices.findByIdAndUpdate(
        { _id: req.body.id },
        {
            name: req.body.name,
            image: req.body.image,
            icon: req.body.icon,
            description: req.body.description,
            longDescription: req.body.longDescription,
        },
        { new: true }
    );
    if (data) {
        res.redirect("./listofservicetable");
    }

});
