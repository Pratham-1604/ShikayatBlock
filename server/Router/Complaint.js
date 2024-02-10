const express = require("express");
const multer = require("multer");
const { upload } = require("../app");
const { getAuthorityFromComplaint } = require("../utils/utils");
const complaintR = express.Router();

complaintR.post("/create", upload.single("file"), (req, res) => {
  console.log("ComplaintRouter");
  res.send("CryptoRouter");
});

complaintR.post("/get_authority_name", async (req, res) => {
  const authorityName = await getAuthorityFromComplaint(
    req.body.complaint_description
  );
  res.send({
    authority_name: authorityName ?? "No authority found",
  });
});

module.exports = complaintR;
