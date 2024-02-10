const express = require("express");
const multer = require("multer");
const { upload } = require("../app");
const { getAuthorityFromComplaint } = require("../utils/utils");
const complaintR = express.Router();

complaintR.post("/create", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log("ComplaintRouter");
  res.send("CryptoRouter");
});

complaintR.post("/get_authority", async (req, res) => {
  console.log(req.body);
  console.log("from router", req.body.complaint_description);
  const authorityName = await getAuthorityFromComplaint(
    req.body.complaint_description
  );
  res.send({
    authority: authorityName ?? "No authority found",
    complaint_description: req.body.complaint_description,
  });
});

module.exports = complaintR;
