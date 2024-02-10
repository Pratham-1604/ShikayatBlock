const jwt = require("jsonwebtoken");

const express = require("express");
const { connections } = require("../app");
const { emitMessage } = require("../util");
const router = express.Router();
// const io = require("../app");
// const { io } = require("../app.js");

require("../db/Conn");
// const User = require("../models/Schema");

const isDM = true;

const handleComplaintRegistered = (req, res) => {
  console.log("complaint_registered");
  res.send("complaint_registered");
};

const handleAddFile = (req, res) => {
  res.send("add_file");
};

const handleComplaintUpdate = (req, res) => {
  res.send("complaint_update");
  emitMessage("complaint_update");
  return;
  if (connections) {
    console.log("io is not null");
    const client = connections[0];

    client.send("complaint_update");
  } else {
    console.log("io is null");
  }
  // io.emit("complaint_update", { data: "complaint_update" });
};

router.post("/", async (req, res) => {
  const sampleBody =
    '{"event_id":"eg_1","event_type":"complaint_update","event_created_date":"2017-01-01 14:56:00","complaint_updated_at":"2017-01-02 14:56:00","complaint_status":"open","complaint_type":"complaint","complaint_created_by":"user_id","reporting_agency":"police","complaint_documents":"<url_of_marksheet_or_the_actual_marksheet>","agency_documents":"<optional_field_if_agency_responds_with_a_document>","complaint_title":"Lost Original Marsheet","complaint_description":"My original copy of marksheet has been lost. I want a new one.","complaint_created_date":"2017-01-01 14:58:00","agency_response":"We are verifying your details. A department official will contact you shortly."}';
  const sampleBodyObj = JSON.parse(sampleBody);
  // res.send("Hello world from the server rotuer js");

  const {
    event_id,
    event_type,
    event_created_date,
    complaint_updated_at,
    complaint_status,
    complaint_type,
    complaint_created_by,
    reporting_agency,
    complaint_documents,
    agency_documents,
    complaint_title,
    complaint_description,
    complaint_created_date,
    agency_response,
  } = req.body;

  switch (event_type) {
    case "complaint_registered":
      handleComplaintRegistered(req, res);
      break;
    // case "complaint_update":
    //   console.log("complaint_update");
    //   break;
    // case "complaint_created":
    //   console.log("complaint_created");
    //   break;
    // case "complaint_closed":
    //   console.log("complaint_closed");
    //   break;
    case "add_file":
      handleAddFile(req, res);
      break;
    case "complaint_update":
      handleComplaintUpdate(req, res);
      break;
    default:
      console.log("default");
      res.send("default");
  }
});

module.exports = router;

// sign jwt and return []
