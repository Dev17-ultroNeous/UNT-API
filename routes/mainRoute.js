const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");
const JobRequirementsController = require("../controllers/JobRequirementsController");
const userController = require("../controllers/userController");
const listOfServices = require("../controllers/listOfServiceController")
const LookAtOurDesign = require("../controllers/lookAtOurDesignController")
const authController = require("../controllers/authController")
const portfolioController = require("../controllers/portfolioController")
const {
    validatePassword,
    validateEmail,
    validateTrim,
    validateTrims,
    validatePhone,
    validateTechnology
} = require("../utils/validation");

router.post("/clientfeedback", FeedbackController.uploadUserPhotos,
    FeedbackController.clientFeedback);

router.post("/clientfeedbackdelete/:id", FeedbackController.clientFeedbackDelete);
router.post("/clientfeedbackupdate/:id", FeedbackController.clientFeedbackUpdate);

router.post("/employefeedback",
    FeedbackController.employeFeedback);

router.post("/employefeedbackdelete/:id", FeedbackController.employeFeedbackDelete);
router.post("/employefeedbackupdate/:id", FeedbackController.employeFeedbackUpdate);

router.post("/listofservices", listOfServices.uploadServicePhotos,
    listOfServices.listOfServices);

router.post("/listofservicesdelete/:id", listOfServices.ListOfServicesDelete);
router.post("/listofservicesupdate/:id", listOfServices.ListOfServicesUpdate);

// router.post("/jobrequirements", JobRequirementsController.jobRequirements);
router.post("/jobrequirementsdelete/:id", JobRequirementsController.jobRequirementsDelete);
router.post("/jobrequirementsupdate", JobRequirementsController.jobRequirementsUpdate);

router.post("/technologyadd", validateTechnology, JobRequirementsController.technologyOfJobRequirements)
router.post("/technologydelete", JobRequirementsController.technologyOfJobRequirementsDelete)
router.post("/technologyupdate", JobRequirementsController.technologyOfJobRequirementsUpdate)

router.post("/contactusdata", validateEmail,
    JobRequirementsController.contactUsData);

router.post("/lookatourdesign", LookAtOurDesign.uploadDesignPhotos, LookAtOurDesign.lookAtOurDesign)
router.post("/lookatourdesigndelete/:id", LookAtOurDesign.LookAtOurDesignDelete);
router.post("/lookatourdesignupdate/:id", LookAtOurDesign.uploadDesignPhotos, LookAtOurDesign.LookAtOurDesignUpdate);

router.post("/technologiesofcontactus", JobRequirementsController.technologiesOfContactUs);
router.post("/technologiesofcontactusdelete/:id", JobRequirementsController.technologiesOfContactUsDelete);
router.post("/technologiesofcontactusupdate/:id", JobRequirementsController.technologiesOfContactUsUpdate);

router.post("/portfolio", portfolioController.uploadPortfolioPhotos, portfolioController.portfolioAdd);
router.post("/portfoliodelete/:id", portfolioController.portfolioDelete);
router.post("/portfolioupdate/:id", portfolioController.portfolioUpdate);

router.post("/signup", validatePassword, userController.signUp);
router.post("/signin", validateEmail, validatePassword,
    userController.signIn);

router.get("/getportfolio", portfolioController.getPortfolio);

router.get("/getclientfeedback", FeedbackController.getClientFeedbacks);
router.get("/getemployefeedback", FeedbackController.getEmployeFeedbacks);
router.get("/getlistofservices", listOfServices.getListOfServices);
router.get("/getjobrequirements", JobRequirementsController.getJobRequirements);
router.get("/gettechnologiesofcontactus", JobRequirementsController.getTechnologiesOfContactUs);
router.post("/getcontactusdata", JobRequirementsController.getContactUsData);
router.get("/getlookatourdesign", LookAtOurDesign.getLookAtOurDesign);


module.exports = router;
