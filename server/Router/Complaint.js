const express = require("express");
const multer = require("multer");
const { upload } = require("../app");
const complaintR = express.Router(); // market router
const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");
const Moralis = require("moralis");
const Moralis2 = Moralis.default;
const moralisKey = process.env.MORALIS_KEY;
const saveFile = require("./Utils");
const axios = require("axios");
// const storage2 = multer.diskStorage({
//   destination: "uploads/",
//   filename: function (req, file, cb) {
//     const name = file.originalname;
//     const filename = name;
//     req.body.mime_type = file.mimetype;
//     req.body.filename = filename;
//     cb(null, filename);
//   },
// });

// const upload = multer({
//   dest: "uploads/",
//   key: function (req, file, cb) {
//     const filename = "ab" + ".pdf";
//     req.body.mime_type = "application/pdf";
//     req.body.filename = filename;
//     cb(null, filename);
//   },
//   storage: storage2,
// }).single("file");
// let marketC = require("../controllers/Market");

// marketC = new marketC();

// marketR.get("/", marketC.marketInfoTotal);
// marketR.get("/:nw", marketC.marketInfo);
// marketR.get("/exchange", marketC.exchangeRate);

// complaintR.post("/create", upload, (req, res) => {

// const ipfs_upload = async (name, path) => {
//   console.log("Inside IPFS Upload");
//   try {
//       const res = await fetch("http://localhost:8085/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fileName: name,
//           filePath: path,
//         }),
//       });

//       if (res.ok) {
//         const data = await res.json(); // Parse the JSON response
//         console.log("Received data:", data); // Logging the entire response for debugging
//         console.log("Stored Hash:", data.storedhash);
//         const uri = data.storedhash;
//         setUrl(uri); // Update the 'url' state with the URI
//       } else {
//         console.error("Error:", res.statusText);
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

complaintR.post("/create", upload.single("file"), async (req, res) => {
  const { complaint_title, complaint_description } = req.body;
  console.log(req.body);
  console.log(req.file);
  console.log("ComplaintRouter");
  // res.send("CryptoRouter");

  // const fileName = req.file.filename;
  const filePath = req.file.path;

  // if (!fileName) {
  //   return res.status(400).json({ error: "No file name." });
  // }

  if (!filePath) {
    return res.status(400).json({ error: "No file path." });
  }

  console.log(`File received. Path: ${filePath}`);

  const storedhash = await saveFile(filePath);
  console.log("Response Stored Hash : ", storedhash);

  try {
    console.log("req.body", req.body);
    console.log("req.userID", req.userID);
    // console.log("userID", req);

    const response = await axios.post(
      "http://localhost:8080/blockchain/newComplaints",
      // {
      //   userId: req.userID,
      //   subject: complaint_title,
      //   description: complaint_description,
      //   ipfs: storedhash,
      // }
      {
        userId: req.userID,
        subject: "hello",
        description: "description",
        ipfs: "ipfs",
      }
    );
    if (response.status === 200) {
      res.status(200).json("Added successfully");
    } else {
      res.status(400).json("Failed to add the complaint.");
    }
  } catch (err) {
    console.log("Error in Pardy:", err);
  }
});

module.exports = complaintR;
