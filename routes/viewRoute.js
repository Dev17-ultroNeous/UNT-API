const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController")
const multer = require("multer");
const sharp = require("sharp")
const listOfServicesController = require("../controllers/listOfServiceController")

router.get("/login", viewController.loginPage, viewController.postloginPage)

router.post("/table", viewController.postloginPage)

router.post("/clientadd", viewController.uploadUserPhotos, viewController.resizeUserPhoto, viewController.clientAdd)
router.post("/employeadd", viewController.uploadUserPhotos, viewController.resizeUserPhoto, viewController.employeAdd)

router.post("/employeupdate", viewController.uploadUserPhotos, viewController.resizeUserPhoto, viewController.employeUpdate)
router.post("/clientupdate", viewController.uploadUserPhotos, viewController.resizeUserPhoto, viewController.clientUpdate)

router.post("/listofserviceadd", listOfServicesController.uploadServicePhotos, listOfServicesController.resizeServicePhoto, listOfServicesController.listOfServices)
router.post("/listofserviceupdate", listOfServicesController.uploadServicePhotos, listOfServicesController.resizeServicePhoto, listOfServicesController.ListOfServicesUpdate)

router.get('/index', viewController.getView)

router.get('/clienttable', viewController.clientTable)
router.get('/employetable', viewController.employeTable)
router.get('/listofservicetable', viewController.listOfServiceTable)
router.get('/contactustable', viewController.contactUsTable)
router.get('/employefeedbackadd', viewController.employeFeedback)
router.get('/employefeedbackupdate', viewController.employeFeedbackForUpdate)
router.get('/listofserviceupdate', viewController.listOfServiceForUpdate)

router.get('/clientfeedbackadd', viewController.clientFeedback)
router.get('/clientfeedback', viewController.clientFeedbackForUpdate)


router.get('/listofservice', viewController.listOfService)
module.exports = router;