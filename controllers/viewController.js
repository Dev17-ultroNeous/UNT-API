const catchAsync = require("../utils/catchAsync");
const ContactUs = require("../models/contactUsModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
let alert = require('alert-node');
const ClientFeedback = require("../models/clientFeedbackModel");
const EmployeFeedback = require("../models/employeFeedbackModel")
const ListOfServices = require("../models/listOfServicesModel");
const multer = require("multer");
const sharp = require("sharp");


exports.getView = catchAsync(async (req, res, next) => {

    const data = await ContactUs.find({});

    res.render("index", {
        data: data
    });
})

exports.loginPage = catchAsync(async (req, res, next) => {
    res.render('login')
})

exports.postloginPage = catchAsync(async (req, res, next) => {

    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.password
        );

        if (validPassword) {
            res.redirect("./contactustable");
        } else {
            alert("Invaild Details")
        }
    } else {
        alert("Invaild Details")
    }


})
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

exports.uploadUserPhotos = upload.single("image");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `${req.body.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(149, 149)
        .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/users/${req.file.filename}`);

    next();
});
exports.employeAdd = catchAsync(async (req, res, next) => {
    const data = await EmployeFeedback.create({
        name: req.body.name,
        designation: req.body.designation,
        image: req.file.filename,
        description: req.body.description
    });

    if (data) {
        res.redirect("./employetable");
    }

})
exports.clientAdd = catchAsync(async (req, res, next) => {
    const data = await ClientFeedback.create({
        name: req.body.name,
        company: req.body.company,
        designation: req.body.designation,
        image: req.file.filename,
        description: req.body.description,
    });

    if (data) {
        res.redirect("./clienttable");
    }

})

exports.clientTable = catchAsync(async (req, res, next) => {
    const data = await ClientFeedback.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image

    })
    res.render('clienttable', {
        data: data,
    })
})

exports.employeTable = catchAsync(async (req, res, next) => {
    const data = await EmployeFeedback.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image
    })
    res.render('employetable', {
        data: data,
    })
})

exports.listOfServiceTable = catchAsync(async (req, res, next) => {
    const data = await ListOfServices.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/service/" + el.image;
    });
    data.map(async (el) => {
        el.icon = process.env.API_URL + "/public/icon/" + el.icon;
    });
    res.render('listofservicetable', {
        data: data,
    })
})
exports.contactUsTable = catchAsync(async (req, res, next) => {
    const data = await ContactUs.find({});

    res.render('contactustable', {
        data: data,
    })
})
exports.clientFeedback = catchAsync(async (req, res, next) => {
    res.render('clientfeedbackadd')
})


exports.employeFeedback = catchAsync(async (req, res, next) => {
    res.render('employefeedbackadd')
})
exports.clientFeedbackForUpdate = catchAsync(async (req, res, next) => {
    let data = await ClientFeedback.findById({ _id: req.query.id });
    res.render('clientfeedback', {
        data: data
    })

})
exports.employeFeedbackForUpdate = catchAsync(async (req, res, next) => {
    let data = await EmployeFeedback.findById({ _id: req.query.id });
    res.render('employefeedbackupdate', {
        data: data
    })

})
exports.employeUpdate = catchAsync(async (req, res, next) => {

    const data = await EmployeFeedback.findByIdAndUpdate(
        { _id: req.body.id },
        {
            name: req.body.name,
            designation: req.body.designation,
            image: req.file.filename,
            description: req.body.description,
        },
        { new: true },
    );
    if (data) {
        res.redirect("./employetable");
    }
})
exports.clientUpdate = catchAsync(async (req, res, next) => {

    const data = await ClientFeedback.findByIdAndUpdate(
        { _id: req.body.id },
        {
            name: req.body.name,
            company: req.body.company,
            designation: req.body.designation,
            image: req.file.filename,
            description: req.body.description,
        },
        { new: true },
    );

    if (data) {
        res.redirect("./clienttable");
    }
})
exports.listOfService = catchAsync(async (req, res, next) => {
    res.render('listofservice')
})
exports.listOfServiceForUpdate = catchAsync(async (req, res, next) => {
    let data = await ListOfServices.findById({ _id: req.query.id });

    data.image = process.env.API_URL + "/public/service/" + data.image;


    data.icon = process.env.API_URL + "/public/icon/" + data.icon;

    res.render('listofserviceupdate', {
        data: data
    })

})