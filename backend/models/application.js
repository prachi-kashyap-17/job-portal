const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
  applyOn:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job",
    required:true
  },
  appliedby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    default:"applied"
  }
})


module.exports=mongoose.model("Application",applicationSchema);