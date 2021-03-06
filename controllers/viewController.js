const catchAsync = require("../utils/catchAsync");
const ContactUs = require("../models/contactUsModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
let alert = require('alert-node');
const ClientFeedback = require("../models/clientFeedbackModel");
const EmployeFeedback = require("../models/employeFeedbackModel")
const ListOfServices = require("../models/listOfServicesModel");
const TechnologyOfJob = require("../models/technologyOfJobRequirementModel");
const TechnologiesOfContactUs = require("../models/technologiesOfContactUsModel");
const Portfolio = require("../models/portfolioModel")
const Blog = require("../models/blogModel")
const LookAtOurDesign = require("../models/lookAtOurDesignModel");
const JobRequirements = require("../models/jobRequirementsModel");
const multer = require("multer");
const sharp = require("sharp");
const metaTag = require("../models/metatagModel");
const MetaTag = require("../models/metatagModel");

exports.getView = catchAsync(async (req, res, next) => {

    const data = await ContactUs.find({});

    res.render("index", {
        data: data
    });
})

exports.loginPage = catchAsync(async (req, res, next) => {
    res.render('login')
})

exports.blogLoginPage = catchAsync(async (req, res, next) => {
    res.render('blog-login')
})




exports.postloginPage = catchAsync(async (req, res, next) => {

    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.password
        );

        if (validPassword && data.role === 'admin') {
            res.redirect("./clienttable");
        } else {
            alert("Invalid Details");

        }
    }
})

exports.postBolgLoginPage = catchAsync(async (req, res, next) => {

    const data = await User.findOne({ email: req.body.email });
    if (data) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            data.password
        );

        if (validPassword) {
            res.redirect("./blogtable");
        } else {
            alert("Invalid Details");

        }
    }
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'public/users/')
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
exports.uploadUserPhotos = upload.single("image");

exports.employeAdd = catchAsync(async (req, res, next) => {
    const data = await EmployeFeedback.create({
        name: req.body.name,
        designation: req.body.designation,
        image: req.body.image,
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
        image: req.body.image,
        description: req.body.description,
    });

    if (data) {
        res.redirect("./clienttable");
    }

})

exports.clientTable = catchAsync(async (req, res, next) => {
    const data = await ClientFeedback.find({}).sort([["createdAt", -1]])
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image

    })
    res.render('clienttable', {
        data: data,
    })
})

exports.employeTable = catchAsync(async (req, res, next) => {
    const data = await EmployeFeedback.find({}).sort([["createdAt", -1]])
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/users/" + el.image
    })
    res.render('employetable', {
        data: data,
    })
})

exports.listOfServiceTable = catchAsync(async (req, res, next) => {
    const data = await ListOfServices.find({}).sort([["createdAt", -1]])
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/service/" + el.image;
    });

    res.render('listofservicetable', {
        data: data,
    })
})

exports.contactusLogin = catchAsync(async (req, res, next) => {
    res.render('contactuslogin')
})
exports.forgetPasswordLink = catchAsync(async (req, res, next) => {
    res.render('forgetpasswordlink')
})
exports.loginForgetPassword = catchAsync(async (req, res, next) => {
    res.render('loginforgetpassword')
})
exports.blogForgetPassword = catchAsync(async (req, res, next) => {
    res.render('blogforgetpassword')
})

exports.contactUsTable = catchAsync(async (req, res, next) => {
    const data = await ContactUs.find({})
    res.render('contactustable', {
        data: data,

    })
})

exports.contactUsTablePage = catchAsync(async (req, res, next) => {
    var perPage = 1;
    var page = req.params.page;

    const data = await ContactUs.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage).exec()
    let count = ContactUs.countDocuments({}).exec()

    res.render('contactustable', {
        data: data,
        current: page,
        pages: Math.ceil(count / perPage)
    })
})

exports.technologyOfContactUsTable = catchAsync(async (req, res, next) => {
    const data = await TechnologiesOfContactUs.find({}).sort([["createdAt", -1]]);

    res.render('technologyofcontactustable', {
        data: data,
    })
})


exports.LookAtOurDesign = catchAsync(async (req, res, next) => {
    const data = await LookAtOurDesign.find({})
        .sort([["sequence", 1]])
        .exec();
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/design/" + el.image;
    });
    res.render('lookourdesigntable', {
        data: data,
    })
});

exports.clientFeedback = catchAsync(async (req, res, next) => {
    res.render('clientfeedbackadd')
})
exports.LookAtOurDesignAdd = catchAsync(async (req, res, next) => {
    res.render('lookourdesignadd')
})

exports.employeFeedback = catchAsync(async (req, res, next) => {
    res.render('employefeedbackadd')
})

exports.JobRequirementAdd = catchAsync(async (req, res, next) => {
    res.render('jobrequirementadd')
})

exports.JobRequirementUpdate = catchAsync(async (req, res, next) => {
    let data = await JobRequirements.findById({ _id: req.query.id });
    res.render('jobrequirementupdate', {
        data: data
    })
})


exports.technologyOfContactUsAdd = catchAsync(async (req, res, next) => {
    res.render('technologyofcontctusadd')
})
exports.portfolioAdd = catchAsync(async (req, res, next) => {
    res.render('portfolioadd')
})

exports.blogAdd = catchAsync(async (req, res, next) => {
    res.render('blogadd')
})
exports.metaTagAdd = catchAsync(async (req, res, next) => {
    res.render('meta-tag-add')
})
exports.blogUpdate = catchAsync(async (req, res, next) => {
    let data = await Blog.findById({ _id: req.query.id });
    data.image = process.env.API_URL + "/public/blog/" + data.image;
    res.render('blogupdate', {
        data: data
    })
})
exports.metaTagUpdate = catchAsync(async (req, res, next) => {
    let data = await MetaTag.findById({ _id: req.query.id });
    res.render('meta-tag-update', {
        data: data
    })
})


exports.blogTable = catchAsync(async (req, res, next) => {
    let data = await Blog.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/blog/" + el.image;
    });
    res.render('blogtable', {
        data: data
    })
})
exports.metaTagTable = catchAsync(async (req, res, next) => {
    let data = await metaTag.find({});
    res.render('meta-tag-table', {
        data: data
    })
})
exports.portfolioTable = catchAsync(async (req, res, next) => {
    let data = await Portfolio.find({});
    data.map(async (el) => {
        el.image = process.env.API_URL + "/public/portfolio/" + el.image;
    });
    res.render('portfoliotable', {
        data: data
    })
})


exports.jobTechnologyTable = catchAsync(async (req, res, next) => {
    const data = await TechnologyOfJob.find({})
    const value = await JobRequirements.find({})

    res.render('jobtechnologytable', {
        data: data,
        value: value
    })

})

exports.technologyAdd = catchAsync(async (req, res, next) => {
    let data = await JobRequirements.findById({ _id: req.query.id });
    res.render('technologyadd', {
        data: data
    })

})

exports.clientFeedbackForUpdate = catchAsync(async (req, res, next) => {
    let data = await ClientFeedback.findById({ _id: req.query.id });
    data.image = process.env.API_URL + "/public/users/" + data.image;
    res.render('clientfeedback', {
        data: data
    })

})
exports.employeFeedbackForUpdate = catchAsync(async (req, res, next) => {
    let data = await EmployeFeedback.findById({ _id: req.query.id });
    data.image = process.env.API_URL + "/public/users/" + data.image;
    res.render('employefeedbackupdate', {
        data: data
    })
})

exports.LookOurDesignUpdate = catchAsync(async (req, res, next) => {
    let data = await LookAtOurDesign.findById({ _id: req.query.id });
    data.image = process.env.API_URL + "/public/design/" + data.image;
    res.render('lookourdesignupdate', {
        data: data
    })
})
exports.technologyOfContactUsUpdate = catchAsync(async (req, res, next) => {
    const data = await TechnologiesOfContactUs.findById({ _id: req.query.id });

    res.render('technologyofcontactusupdate', {
        data: data,
    })
})
exports.portfolioUpdate = catchAsync(async (req, res, next) => {
    const data = await Portfolio.findById({ _id: req.query.id });

    data.image = process.env.API_URL + "/public/portfolio/" + data.image;
    res.render('portfolioupdate', {
        data: data,
    })
})

exports.JobRequirementTable = catchAsync(async (req, res, next) => {

    let data = await JobRequirements.find({}).sort([["sequence", 1]]);
    res.render('jobrequirementtable', {
        data: data
    })
})

exports.employeUpdate = catchAsync(async (req, res, next) => {

    const data = await EmployeFeedback.findByIdAndUpdate(
        { _id: req.body.id },
        {
            name: req.body.name,
            designation: req.body.designation,
            image: req.body.image,
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
            image: req.body.image,
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
    res.render('listofserviceupdate', {
        data: data
    })

})