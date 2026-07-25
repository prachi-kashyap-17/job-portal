const Job =require("../models/job")

exports.postjob = async(req,res,next)=> {
  const {title,companyName,description,location,salary,jobType,skilledRequired}=req.body;

  if (!req.session.isloggedin) {
  return res.status(401).json({ msg: "Please login first" });
}

  const job = new Job({
    title,companyName,location,description,salary,jobType,skilledRequired,postedBy: req.session.loggedInUser.id
  })
  await job.save()
  res.status(200).json({msg:"detail store sucessfully"})
}



exports.getalljob=async(req,res,next)=>{
   const joblist = await Job.find()
   res.status(200).json(joblist);
}


exports.getJobById =async(req,res,next)=>{
  const job = await Job.findById(req.params.id);
  res.status(200).json(job)
}


exports.getMyJobs= async(req,res,next) => {
  if(!req.session.isloggedin){
    res.status(401).json({err:"please login first"})
  } 
  const job = await Job.find({postedBy:req.session.loggedInUser.id});
  res.status(200).json(job)
}


exports.deleteJobById=async(req,res,next)=>{
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(200).json(job)
}

exports.updatePostById=async(req,res,next)=>{
  const job = await Job.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.status(200).json(job)
}



// $regex searches for partial text instead of an exact match.
// Example:
// Database: "Frontend Developer"
// Search: "Front" → Match
// Search: "Frontend" → Match
// Search: "Developer" → Match
// "i" means case-insensitive.
// "frontend", "Frontend", "FRONTEND" all match.

exports.getsearchJob=async(req,res,next)=>{
  const job = await Job.find({ title: {
        $regex: req.query.title,
        $options: "i",
      },
      location: {
        $regex: req.query.location,
        $options: "i",
      }});
  res.status(200).json(job);
}