const express = require("express");
const multer = require("multer");
const complaintR = express.Router(); // market router

const storage2 = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        const name = file.originalname;
        const filename = name;
        req.body.mime_type = file.mimetype;
        req.body.filename = filename;
        cb(null, filename);
    },
});

const upload = multer({
    dest: "uploads/",
    key: function (req, file, cb) {
        const filename = "ab" + ".pdf";
        req.body.mime_type = "application/pdf";
        req.body.filename = filename;
        cb(null, filename);
    },
    storage: storage2,
}).single("file");
// let marketC = require("../controllers/Market");

// marketC = new marketC();

// marketR.get("/", marketC.marketInfoTotal);
// marketR.get("/:nw", marketC.marketInfo);
// marketR.get("/exchange", marketC.exchangeRate);

complaintR.post("/create", upload, (req, res) => {
    console.log(req.file)
    console.log("ComplaintRouter")
    res.send("CryptoRouter");
})

module.exports = complaintR;