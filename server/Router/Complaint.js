const express = require("express");

const complaintR = express.Router(); // market router

// let marketC = require("../controllers/Market");

// marketC = new marketC();

// marketR.get("/", marketC.marketInfoTotal);
// marketR.get("/:nw", marketC.marketInfo);
// marketR.get("/exchange", marketC.exchangeRate);

complaintR.post("/create", (req, res) => {
    console.log(req.body)
    res.send("CryptoRouter");
})

module.exports = complaintR;