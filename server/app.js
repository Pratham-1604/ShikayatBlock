const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
const multer = require("multer");

require("./db/Conn");
const User = require("./models/UserSchema");
const AddressTracker = require("./models/AddressTracker");
const auth = require("./middlewares/auth");
// const { default: auth } = require("./middlewares/auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.none());
// Set up multer storage configuration
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the files
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    // Generate unique file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer middleware
const upload = multer({ storage: storage });
exports.upload = upload;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const baseR = express.Router();
app.use(
  "/api",
  (req, res, next) => {
    // Allow requests from any origin
    // console.log("test set in req", req.body);

    res.header("Access-Control-Allow-Origin", "*");
    // Allow the following HTTP methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    // Allow these headers to be sent
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  baseR
);

baseR.use("/explore", require("./Router/Block"));
app.use("/auth", require("./Router/Auth"));
baseR.use("/market", require("./Router/Market"));
baseR.use("/complaint", auth, require("./Router/Complaint"));

// app.use("/fixed_label", (req, res, next) => {
//   // Allow requests from any origin
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// }, require("./Router/Test"));

// app.use((req, res, next) => {
//   // Allow requests from any origin

//   res.header('Access-Control-Allow-Origin', '*');
//   // Allow the following HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   // Allow these headers to be sent
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

const PORT = 5000;
app.listen(PORT, () => {
  // console.clear()
  console.log(`Server@http://localhost:${PORT}`);
});
