const multer = require('multer')
const sharp = require("sharp");
const ListOfServices = require("../models/listOfServicesModel");
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

exports.uploadServicePhotos = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon', maxCount: 1 }
]);

exports.resizeServicePhoto = catchAsync(async (req, res, next) => {

    //icon
    req.body.icon = `icon-${req.body.name}-${Date.now()}.jpeg`;
    await sharp(req.files.icon[0].buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .flatten({ background: '#1A1112' })
        .toFile(`public/icon/${req.body.icon}`);



    //image
    req.body.image = `image-${req.body.name}-${Date.now()}.jpeg`;
    await sharp(req.files.image[0].buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/service/${req.body.image}`);

    next();
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, 'public/service/')
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${req.body.name}` + '-' + Date.now()
//         req.body.icon = uniqueSuffix + file.originalname;
//         cb(null, uniqueSuffix + file.originalname)
//     }
// });

// const uploads = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             req.imageValid = true;
//             cb(null, true);
//         } else {
//             req.imageValid = false;
//             cb(null, false);
//         }
//     }
// });

// exports.uploadIconPhotos = uploads.single("image");

exports.listOfServices = catchAsync(async (req, res, next) => {



    const data = await ListOfServices.create({
        name: req.body.name,
        image: req.body.image,
        link: req.body.link,
        icon: req.body.icon,
        description: req.body.description,
        longDescription: req.body.longDescription,
    });
    if (data) {
        res.redirect("./listofservicetable");
    }
});
exports.getListOfServices = catchAsync(async (req, res, next) => {
    const data = await ListOfServices.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/service/" + el.image;
    });
    data.map(async (el) => {
        el.icon = process.env.API_URL + "/public/icon/" + el.icon;
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
