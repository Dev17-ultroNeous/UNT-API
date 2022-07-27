const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const listOfServicesController = require("../controllers/listOfServiceController");
const LookAtOurDesign = require("../controllers/lookAtOurDesignController");
const JobRequirementsController = require("../controllers/jobRequirementsController");
const portfolioController = require("../controllers/portfolioController");
const blogController = require("../controllers/blogController");
const metaTag = require("../models/metatagModel");

router.get("/login", viewController.loginPage, viewController.postloginPage);
router.post("/table", viewController.postloginPage);

router.get("/blog-login", viewController.blogLoginPage);
router.post("/blog-login", viewController.postBolgLoginPage);

router.post("/jobrequirementadd", JobRequirementsController.jobRequirements);
router.post(
    "/technologyadd",
    JobRequirementsController.technologyOfJobRequirements
);

router.get("/index", viewController.getView);

router.get("/portfolioupdate", viewController.portfolioUpdate);
router.get("/portfolioadd", viewController.portfolioAdd);
router.get("/portfoliotable", viewController.portfolioTable);
router.post(
    "/portfolioadd",
    portfolioController.uploadPortfolioPhotos,
    portfolioController.resizePortfolioPhoto,
    portfolioController.portfolioAdd
);
router.post(
    "/portfolioupdate",
    portfolioController.uploadPortfolioPhotos,
    portfolioController.resizePortfolioPhoto,
    portfolioController.portfolioUpdate
);

router.get("/contactustable", viewController.contactUsTable);
router.get(
    "/contactustable/:page",
    viewController.contactUsTable,
    viewController.contactUsTablePage
);

router.post(
    "/employeadd",
    viewController.uploadUserPhotos,
    viewController.employeAdd
);
router.post(
    "/employeupdate",
    viewController.uploadUserPhotos,
    viewController.employeUpdate
);
router.get("/employetable", viewController.employeTable);
router.get("/employefeedbackadd", viewController.employeFeedback);
router.get("/employefeedbackupdate", viewController.employeFeedbackForUpdate);

router.post(
    "/clientadd",
    viewController.uploadUserPhotos,
    viewController.clientAdd
);
router.post(
    "/clientupdate",
    viewController.uploadUserPhotos,
    viewController.clientUpdate
);
router.get("/clienttable", viewController.clientTable);
router.get("/clientfeedbackadd", viewController.clientFeedback);
router.get("/clientfeedback", viewController.clientFeedbackForUpdate);

router.post(
    "/lookatourdesignadd",
    LookAtOurDesign.uploadDesignPhotos,
    LookAtOurDesign.resizeDesignPhoto,
    LookAtOurDesign.lookAtOurDesign
);
router.post(
    "/lookourdesignupdate",
    LookAtOurDesign.uploadDesignPhotos,
    LookAtOurDesign.resizeDesignPhoto,
    LookAtOurDesign.LookAtOurDesignUpdate
);
router.get("/lookourdesignadd", viewController.LookAtOurDesignAdd);
router.get("/lookourdesignupdate", viewController.LookOurDesignUpdate);
router.get("/lookourdesigntable", viewController.LookAtOurDesign);

router.post(
    "/listofserviceadd",
    listOfServicesController.uploadServicePhotos,
    listOfServicesController.listOfServices
);
router.post(
    "/listofserviceupdate",
    listOfServicesController.uploadServicePhotos,
    listOfServicesController.ListOfServicesUpdate
);
router.get("/listofservice", viewController.listOfService);
router.get("/listofserviceupdate", viewController.listOfServiceForUpdate);
router.get("/listofservicetable", viewController.listOfServiceTable);

router.get("/jobrequirementtable", viewController.JobRequirementTable);
router.get("/jobrequirementadd", viewController.JobRequirementAdd);
router.get("/technologyadd", viewController.technologyAdd);
router.get("/jobrequirementupdate", viewController.JobRequirementUpdate);
router.post(
    "/jobrequirementupdate",
    JobRequirementsController.jobRequirementsUpdate
);
router.get("/jobtechnologytable", viewController.jobTechnologyTable);

router.post(
    "/technologyofcontactusadd",
    JobRequirementsController.technologiesOfContactUs
);
router.get(
    "/technologyofcontactusupdate",
    viewController.technologyOfContactUsUpdate
);
router.get("/technologyofcontctusadd", viewController.technologyOfContactUsAdd);
router.get(
    "/technologyofcontactustable",
    viewController.technologyOfContactUsTable
);
router.post(
    "/technologyofcontactusupdate",
    JobRequirementsController.technologiesOfContactUsUpdate
);

router.get("/blogtable", viewController.blogTable);
router.get("/meta-tag-table", viewController.metaTagTable);

router.get("/blogadd", viewController.blogAdd);

router.get("/meta-tag-add", viewController.metaTagAdd);

router.post(
    "/blogadd",
    blogController.uploadBlogPhotos,
    blogController.resizeBlogPhoto,
    blogController.blogAdd
);

router.post(
    "/metatagadd",
    blogController.metaTagAdd
);


router.get("/blogupdate", viewController.blogUpdate);
router.get("/meta-tag-update", viewController.metaTagUpdate);

router.post("/meta-tag-update", blogController.metaTagUpdate);
router.post(
    "/blogupdate",
    blogController.uploadBlogPhotos,
    blogController.resizeBlogPhoto,
    blogController.blogUpdate
);

router.post(
    "/metatagadd",
    blogController.metaTagAdd
);


router.get("/contactuslogin", viewController.contactusLogin);
router.get("/forgetpasswordlink", viewController.forgetPasswordLink);
router.get("/loginforgetpassword", viewController.loginForgetPassword);
router.get("/blogforgetpassword", viewController.blogForgetPassword);

module.exports = router;
