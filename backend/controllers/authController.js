const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");


exports.postRegister = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("first name should contain atleast 2 or more character")
    .matches(/^[A-Za-z\s]+/) //+ means minimum ek character hona chaiya
    .withMessage("first name should chain only alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*/) //*means 0 yah jada character
    .withMessage("last name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("please enter your email")
    .normalizeEmail(), //agar specail charcter dala tho ussa save kar na ma easy hoga

  check("password")
    .isLength({ min: 8 })
    .withMessage("password should contain atleast 8 character")
    .matches(/[a-z]/)
    .withMessage("atleast one lower case")
    .matches(/[A-Z]/)
    .withMessage("at least one uper case ")
    .matches(/[0-9]/)
    .withMessage("contain atleast one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("contain atleast one special charcter")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirm password does not match with password");
      }
      return true;
    }),
  check("role")
    .notEmpty()
    .withMessage("please select the user type")
    .isIn(["candidate", "recruiter"])
    .withMessage("invalid user type"),

  async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashing the password

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  },
];





exports.postlogin = async(req,res,next) =>{
  const {email , password} = req.body;
  const user = await User.findOne({email});

  if(!user){
     return res.status(400).json({ error: "Invalid email" });
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(404).json({error:"Invalid password"})
  }
  req.session.isloggedin = true;
  req.session.loggedInUser={
    id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    role:user.role
  }
  await req.session.save()

  res.status(200).json({
    msg:"logged in sucessfully",
    user:req.session.loggedInUser
  })
}


exports.postlogout=async(req,res,next)=>{
  req.session.destroy(()=>{
    res.status(200).json({msg:"logout sucessfully"})
  })
}


exports.getProfiledata=async(req,res,next)=>{
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"})
  }
  const profiledetail = await User.findById(req.session.loggedInUser.id).select("-password");
  return res.status(200).json(profiledetail)
}

exports.updateprofile=async(req,res,next)=>{
  if(!req.session.isloggedin){
    return res.status(401).json({msg:"please login first"})
  }
  const updatedfield = {...req.body}
  if(req.file){
    updatedfield.resume = req.file.path;
  }
  const updatedata = await User.findByIdAndUpdate(req.session.loggedInUser.id,updatedfield,{new:true});
  res.status(200).json(updatedata)
}