const express = require("express");
const applicationRouter = express.Router();

const applicationController = require("../controllers/applicationController");

applicationRouter.post("/apply/:id",applicationController.applyOnJob)
applicationRouter.get("/Myapplication",applicationController.myApplication);
applicationRouter.post("/savejob/:id",applicationController.savedJob);
applicationRouter.get("/savejob",applicationController.getSaveJob);
applicationRouter.post("/unsaveJob/:id",applicationController.unsaveJob);
applicationRouter.get("/recruiter/job/:id/applicants",applicationController.getAllApplicants)


// console.log("Registered routes:", applicationRouter.stack.map(r => r.route?.path));

module.exports=applicationRouter;