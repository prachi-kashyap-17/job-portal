const express = require('express');
const authrouter = express.Router();

const authcontroller = require("../controllers/authController");

authrouter.post("/register",authcontroller.postRegister);
authrouter.post("/login",authcontroller.postlogin);
authrouter.post("/logout",authcontroller.postlogout);

authrouter.get("/profile",authcontroller.getProfiledata)

authrouter.put("/updateprofile",authcontroller.updateprofile)

module.exports=authrouter;