const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");
const JobRequirementsController = require("../controllers/JobRequirementsController");
const userController = require("../controllers/userController");
const listOfServices = require("../controllers/listOfServiceController")
const LookAtOurDesign = require("../controllers/lookAtOurDesignController")
const authController = require("../controllers/authController")
const {
    validatePassword,
    validateEmail,
    validateTrim,
    validateTrims,
    validatePhone,
    validateTechnology
} = require("../utils/validation");

router.post("/clientfeedback", FeedbackController.uploadUserPhotos,
    FeedbackController.resizeUserPhoto, validateTrim, FeedbackController.clientFeedback);

router.post("/clientfeedbackdelete/:id", FeedbackController.clientFeedbackDelete);
router.post("/clientfeedbackupdate/:id", FeedbackController.clientFeedbackUpdate);

router.post("/employefeedback",
    FeedbackController.employeFeedback);

router.post("/employefeedbackdelete/:id", FeedbackController.employeFeedbackDelete);
router.post("/employefeedbackupdate/:id", FeedbackController.employeFeedbackUpdate);

router.post("/listofservices", listOfServices.uploadServicePhotos,
    listOfServices.resizeServicePhoto, validateTrim, listOfServices.listOfServices);

router.post("/listofservicesdelete/:id", listOfServices.ListOfServicesDelete);
router.post("/listofservicesupdate/:id", listOfServices.ListOfServicesUpdate);

router.post("/jobrequirements", JobRequirementsController.jobRequirements);
router.post("/jobrequirementsdelete", JobRequirementsController.jobRequirementsDelete);
router.post("/jobrequirementsupdate", JobRequirementsController.jobRequirementsUpdate);

router.post("/technologyadd", validateTechnology, JobRequirementsController.technologyOfJobRequirements)
router.post("/technologyupdate", JobRequirementsController.technologyOfJobRequirementsDelete)

router.post("/contactusdata", validateEmail,
    validatePhone, JobRequirementsController.contactUsData);

router.post("/lookatourdesign", LookAtOurDesign.uploadDesignPhotos, LookAtOurDesign.resizeDesignPhoto, LookAtOurDesign.lookAtOurDesign)

router.post("/lookatourdesignupdate", LookAtOurDesign.uploadDesignPhotos, LookAtOurDesign.resizeDesignPhoto, LookAtOurDesign.LookAtOurDesignUpdate);

router.post("/technologiesofcontactus", JobRequirementsController.technologiesOfContactUs);
router.post("/technologiesofcontactusdelete", JobRequirementsController.technologiesOfContactUsDelete);

router.post("/signup", validatePassword, userController.signUp);
router.post("/signin", validateEmail, validatePassword,
    userController.signIn);

router.get("/getclientfeedback", FeedbackController.getClientFeedbacks);
router.get("/getemployefeedback", FeedbackController.getEmployeFeedbacks);
router.get("/getlistofservices", listOfServices.getListOfServices);
router.get("/getjobrequirements", JobRequirementsController.getJobRequirements);
router.get("/gettechnologiesofcontactus", JobRequirementsController.getTechnologiesOfContactUs);
router.get("/getcontactusdata", JobRequirementsController.getContactUsData);
router.get("/getlookatourdesign", LookAtOurDesign.getLookAtOurDesign);


module.exports = router;
