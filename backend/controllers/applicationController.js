const application = require("../models/application");

exports.applyOnJob =async(req,res,next)=>{
  const jobId = req.params.id;
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please apply first"});
  }
  const checkDuplicate = await application.findOne({applyOn:jobId,appliedby:req.session.loggedInUser.id});
  if(checkDuplicate){
    return res.status(200).json({msg:"already apply"});
  }
  const newapplication = new application({
    applyOn:jobId,appliedby:req.session.loggedInUser.id
  })
  await newapplication.save()
  res.status(200).json({msg:"applied sucessfully"})
}


exports.myApplication =async(req,res,next)=>{
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"})
  }
  const jobs = await application.find({appliedby:req.session.loggedInUser.id,status: "applied"}).populate("applyOn")
  return res.status(200).json(jobs)
}


exports.savedJob =async(req,res,next)=> {
  const id = req.params.id
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"})
  }
  const checkduplicate = await application.findOne({applyOn:id,appliedby:req.session.loggedInUser.id,status:"saved"});
  if(checkduplicate){
    return res.status(200).json({msg:"job is already saved"})
  }
   const newapplication = new application({
    applyOn:id,appliedby:req.session.loggedInUser.id,status:"saved"
  })
  await newapplication.save()
  res.status(200).json({msg:"job saved sucessfully"})
}


exports.getSaveJob =async(req,res,next)=>{
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"});
  }
  const job = await application.find({appliedby:req.session.loggedInUser.id,status:"saved"}).populate("applyOn");
  return res.status(200).json(job);
}


exports.unsaveJob =async(req,res,next)=>{
  const id =req.params.id;
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"});
  }
  const unsave = await application.findByIdAndDelete(id);
  res.status(200).json(unsave);
}


exports.getAllApplicants=async(req,res,next)=> {
  const job = await application.find({applyOn:req.params.id,status:"applied"}).populate("appliedby");
  res.status(200).json(job)
}