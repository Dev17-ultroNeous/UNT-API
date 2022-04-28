const { check, validationResult } = require("express-validator");

const sendErrorResponse = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: "error",
            message: errors.errors.map((el) => el.msg)[0],
        });
    }

    next();
};

exports.validatePassword = [
    check("password")
        .trim()
        .notEmpty()
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/,
            "i"
        )
        .withMessage(
            "Password must contain min 6 characters. One uppercase, one lowercase, one number and one special character."
        ),
    (req, res, next) => {

        sendErrorResponse(req, res, next);
    }


];

exports.validateEmail = [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Please enter a valid email.'),
    (req, res, next) => {

        sendErrorResponse(req, res, next);
    }

]

exports.validateTechnology = [
    check('id')
        .trim()
        .notEmpty()
        .withMessage('Please enter id. '),

    check('technologyName')
        .trim()
        .notEmpty()
        .withMessage('Please enter  technologyName.'),

    check('count')
        .trim()
        .notEmpty()
        .withMessage('Please enter count.'),
    (req, res, next) => {

        sendErrorResponse(req, res, next);
    }

]

exports.validateTrims = [

    check('description')
        .trim()
        .notEmpty()
        .withMessage('Please enter description. '),



    check('designation')
        .trim()
        .notEmpty()
        .withMessage('Please enter  designation.'),

    check('name')
        .trim()
        .notEmpty()
        .withMessage('Please enter name.'),
    (req, res, next) => {

        sendErrorResponse(req, res, next);
    }


]
exports.validateTrim = [

    check('description')
        .trim()
        .notEmpty()
        .withMessage('Please enter description.'),



    check('designation')
        .trim()
        .notEmpty()
        .withMessage('Please enter  designation.'),

    check('name')
        .trim()
        .notEmpty()
        .withMessage('Please enter name.'),
    (req, res, next) => {

        sendErrorResponse(req, res, next);
    }


]
exports.validatePhone = [

    check('phone')
        .notEmpty()
        .withMessage('Please enter  phoneNumber. '),

]