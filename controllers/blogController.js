const multer = require("multer");
const sharp = require("sharp");
const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const catchAppError = require("../utils/catchAppError");
const MetaTag = require("../models/metatagModel");

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

exports.uploadBlogPhotos = upload.single("image");

exports.resizeBlogPhoto = catchAsync(async (req, res, next) => {

    req.body.image = `Blog-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize({
            width: 416,
            height: 381
        })
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/blog/${req.body.image}`);

    next();
});
exports.blogAdd = catchAsync(async (req, res, next) => {

    const data = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
    });

    if (data) {
        res.redirect("./blogtable");
    }
});

exports.metaTagAdd = catchAsync(async (req, res, next) => {

    const data = await MetaTag.create({
        title: req.body.title,
        metaTag: req.body.metaTag,
        pageName: req.body.pageName
    });

    if (data) {
        res.redirect("./meta-tag-table");
    }
});
exports.getMetaTag = catchAsync(async (req, res, next) => {
    const data = await MetaTag.find({})

    res.status(200).json({
        status: "success",
        data,
    });
});
exports.metaTagDelete = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await MetaTag.findByIdAndDelete({ _id: id });

    res.status(200).json({
        status: "success",
        data,
    });
});

exports.getBlog = catchAsync(async (req, res, next) => {
    const data = await Blog.find({}).sort([["createdAt", -1]])
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/blog/" + el.image;
    });
    res.status(200).json({
        status: "success",
        data,
    });
});

exports.blogDelete = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await Blog.findByIdAndDelete({ _id: id });

    res.status(200).json({
        status: "success",
        data,
    });
});


exports.blogUpdate = catchAsync(async (req, res, next) => {
    const id = req.body.id
    const data = await Blog.findByIdAndUpdate(
        { _id: id },
        {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            image: req.body.image,

        },
        { new: true },
    );
    if (data) {
        res.redirect("./blogtable");
    }
});

exports.metaTagUpdate = catchAsync(async (req, res, next) => {
    const id = req.body.id
    const data = await MetaTag.findByIdAndUpdate(
        { _id: id },
        {
            title: req.body.title,
            metaTag: req.body.metaTag,
            pageName: req.body.pageName,

        },
        { new: true },
    );
    if (data) {
        res.redirect("./meta-tag-table");
    }
});
