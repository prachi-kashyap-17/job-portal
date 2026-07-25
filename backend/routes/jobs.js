const express = require("express");
const jobrouter = express.Router()

const jobController = require("../controllers/jobController");



jobrouter.post("/recruiter/postjob",jobController.postjob);
jobrouter.get("/jobs",jobController.getalljob);
jobrouter.get("/jobs/:id",jobController.getJobById);
jobrouter.get("/recruiter/myjobs",jobController.getMyJobs);
jobrouter.delete("/recruiter/deletepost/:id",jobController.deleteJobById)
jobrouter.put("/recruiter/updatepost/:id",jobController.updatePostById)
jobrouter.get("/searchjob",jobController.getsearchJob);

module.exports=jobrouter;