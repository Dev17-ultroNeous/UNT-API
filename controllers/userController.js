const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = catchAsync(async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const inquiryPassword = await bcrypt.hash(req.body.inquiryPassword, salt);
    const data = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        inquiryPassword: inquiryPassword,
        phone: req.body.phone,

    });
    res.status(200).json({
        status: "success",
        message: "Successfully SignUp",
        data,
    });
});


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


exports.signIn = catchAsync(async (req, res, next) => {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.password
        );
        const token = signToken(data._id);
        if (validPassword && data.role === "admin") {
            res.status(200).json({
                status: "success",
                message: "Successfully SignIn",
                token,
                data,
            });

        } else if (validPassword && data.role === "bloger") {
            res.status(200).json({
                status: "success",
                message: "Successfully SignIn",
                token,
                data,
            });

        } else {
            res.status(200).json({
                status: "fail",
                message: "Please enter a valid password.",
            });
        }
    } else {
        res.status(200).json({
            status: "fail",
            message: "Please enter a valid details.",
        });
    }
});
exports.blogerSignIn = catchAsync(async (req, res, next) => {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.password
        );
        const token = signToken(data._id);
        if (validPassword && data.role === "admin") {
            res.status(200).json({
                status: "success",
                message: "Successfully SignIn",
                token,
                data,
            });

        } else {
            res.status(200).json({
                status: "fail",
                message: "Please enter a valid password.",
            });
        }
    } else {
        res.status(200).json({
            status: "fail",
            message: "Please enter a valid details.",
        });
    }
});

exports.signInInquiry = catchAsync(async (req, res, next) => {
    const data = await User.findOne({ email: req.body.email });

    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.inquiryPassword
        );

        const token = signToken(data._id);
        if (validPassword && data.role === "admin") {
            res.status(200).json({
                status: "success",
                message: "Successfully SignIn",
                token,
                data,
            });
        } else {
            res.status(200).json({
                status: "fail",
                message: "Please enter a valid password.",
            });
        }
    }
    else {
        res.status(200).json({
            status: "fail",
            message: "Please enter a valid details.",
        });
    }

})