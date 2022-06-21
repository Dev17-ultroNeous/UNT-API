const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedbackController");
const JobRequirementsController = require("../controllers/jobRequirementsController");
const userController = require("../controllers/userController");
const listOfServices = require("../controllers/listOfServiceController");
const LookAtOurDesign = require("../controllers/lookAtOurDesignController");
const authController = require("../controllers/authController");
const portfolioController = require("../controllers/portfolioController");
const blogController = require("../controllers/blogController");
const {
    validatePassword,
    validateEmail,
    validateTrim,
    validateTrims,
    validatePhone,
    validateTechnology,
} = require("../utils/validation");

router.post(
    "/clientfeedback",
    FeedbackController.uploadUserPhotos,
    FeedbackController.clientFeedback
);

router.post(
    "/clientfeedbackdelete/:id",
    FeedbackController.clientFeedbackDelete
);
router.post(
    "/clientfeedbackupdate/:id",
    FeedbackController.clientFeedbackUpdate
);

router.post("/employefeedback", FeedbackController.employeFeedback);

router.post(
    "/employefeedbackdelete/:id",
    FeedbackController.employeFeedbackDelete
);
router.post(
    "/employefeedbackupdate/:id",
    FeedbackController.employeFeedbackUpdate
);

router.post(
    "/listofservices",
    listOfServices.uploadServicePhotos,
    listOfServices.listOfServices
);

router.post("/listofservicesdelete/:id", listOfServices.ListOfServicesDelete);
router.post("/listofservicesupdate/:id", listOfServices.ListOfServicesUpdate);

router.post("/jobrequirements", JobRequirementsController.jobRequirements);
router.post(
    "/jobrequirementsdelete",
    JobRequirementsController.jobRequirementsDelete
);
router.post(
    "/jobrequirementsupdate",
    JobRequirementsController.jobRequirementsUpdate
);

router.post(
    "/technologyadd",
    validateTechnology,
    JobRequirementsController.technologyOfJobRequirements
);
router.post(
    "/technologydelete",
    JobRequirementsController.technologyOfJobRequirementsDelete
);
router.post(
    "/technologyupdate",
    JobRequirementsController.technologyOfJobRequirementsUpdate
);
router.post(
    "/maintechnologydelete",
    JobRequirementsController.mainTechnologyOfJobRequirementsDelete
);

router.post(
    "/contactusdata",
    validateEmail,
    JobRequirementsController.contactUsData
);

router.post(
    "/sendforgetpasswordmail",
    JobRequirementsController.forgetPasswordEmail
);

router.post(
    "/sendforgetpasswordmailforlogin",
    JobRequirementsController.forgetPasswordEmailForLogin
);

router.post("/forgetpassword", JobRequirementsController.forgetPassword);
router.post(
    "/forgetpasswordforlogin",
    JobRequirementsController.forgetPasswordForLogin
);

router.post(
    "/lookatourdesign",
    LookAtOurDesign.uploadDesignPhotos,
    LookAtOurDesign.lookAtOurDesign
);
router.post(
    "/lookatourdesigndelete/:id",
    LookAtOurDesign.LookAtOurDesignDelete
);
router.post(
    "/lookatourdesignupdate/:id",
    LookAtOurDesign.uploadDesignPhotos,
    LookAtOurDesign.LookAtOurDesignUpdate
);

router.post(
    "/technologiesofcontactus",
    JobRequirementsController.technologiesOfContactUs
);
router.post(
    "/technologiesofcontactusdelete/:id",
    JobRequirementsController.technologiesOfContactUsDelete
);
router.post(
    "/technologiesofcontactusupdate/:id",
    JobRequirementsController.technologiesOfContactUsUpdate
);

router.post(
    "/portfolio",
    portfolioController.uploadPortfolioPhotos,
    portfolioController.portfolioAdd
);
router.post("/portfoliodelete/:id", portfolioController.portfolioDelete);
router.post("/portfolioupdate/:id", portfolioController.portfolioUpdate);

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signininquiry", userController.signInInquiry);
router.post("/blogersignin", userController.blogerSignIn);

router.post("/blogdelete/:id", blogController.blogDelete);
router.post(
    "/metatagdelete/:id",
    blogController.metaTagDelete
);
router.post("/blogupdate/:id", portfolioController.portfolioUpdate);

router.get("/getportfolio", portfolioController.getPortfolio);

router.get("/getclientfeedback", FeedbackController.getClientFeedbacks);
router.get("/getemployefeedback", FeedbackController.getEmployeFeedbacks);
router.get("/getlistofservices", listOfServices.getListOfServices);
router.get("/getjobrequirements", JobRequirementsController.getJobRequirements);
router.get(
    "/gettechnologiesofcontactus",
    JobRequirementsController.getTechnologiesOfContactUs
);
router.post("/getcontactusdata", JobRequirementsController.getContactUsData);
router.get("/getlookatourdesign", LookAtOurDesign.getLookAtOurDesign);
router.get("/getblog", blogController.getBlog);

router.post("/blogadd", blogController.uploadBlogPhotos, blogController.resizeBlogPhoto, blogController.blogAdd);



module.exports = router;
