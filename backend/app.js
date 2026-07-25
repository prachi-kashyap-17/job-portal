const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer")

//routes
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs")
const applicationRouter = require("./routes/applications")

//session 
const session = require("express-session");//this package is used to create session in express
const MongoDBStore = require("connect-mongodb-session")(session);//this package is used to store the session in mongodb


// ("dotenv") loads the dotenv package.config() reads the .env file and puts its values into process.env,
require("dotenv").config();


const DB_PATH =process.env.MONGO_URI;
const app = express();


const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/")
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now()+"-"+file.originalname)
  }
})

const filefilter =(req,file,cb)=>{
  if(file.mimetype === "application/pdf"){
    cb(null,true);
  }else{
    cb (null,false);
  }
}

app.use(multer({ storage, fileFilter: filefilter }).single("resume"));
app.use("/uploads", express.static("uploads"));


app.use(
  cors({
    origin: "https://job-portal-prachi-3049.vercel.app",
    credentials: true,
  })
);


app.use(//enable session for every request
  session({
    secret: process.env.SESSION_SECRET,// secret is used to sign session cookies - keeping it in .env
// means it's not exposed in code, so it stays private
    resave: false,//if there is no change in session ,dont save again in db
    saveUninitialized: false, // Save session only after some data is added
    store: store, // Store sessions in MongoDB instead of server memory (RAM)
  })
);

app.use(express.json());
app.use(authRouter);
app.use(jobRouter);
app.use(applicationRouter)

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const PORT = process.env.PORT||1703;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("failure while connecting :", err);
  });
