const axios = require("axios");
const ethers = require("ethers");
const { providers } = require("ethers");

require("dotenv").config();


const API_URL = process.env.SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {
  abi,
} = require("./artifacts/contracts/ComplaintContract.sol/ComplaintContract.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const newComplaint = async (req, res) => {
  try {
    const { userId, subject, description, ipfs } = req.body;
    const tx = await contractInstance.submitComplaint(
      userId,
      subject,
      description,
      ipfs
    );
    const receipt = await tx.wait();
    const txHash = receipt.transactionHash;
    const obj = {
      event_id: "eg_1",
      event_type: "new_complaint_added",
      user_id: userId,
      event_created_date: " 2017-01-01 14:56:00",
      complaint_updated_at: " 2017-01-02 14:56:00",
      complaint_status: " open",
      complaint_type: " complaint",
      complaint_created_by: " user_id",
      reporting_agency: " police",
      complaint_documents: "<url of marksheet or the actual marksheet>",
      agency_documents: "<optional field if agency responds with a document>",
      complaint_title: "Lost Original Marsheet",
      complaint_description:
        " My original copy of marksheet has been lost. I want a new one.",
      complaint_created_date: " 2017-01-01 14:58:00",
      agency_response:
        "We are verifying your details. A department official will contact you shortly.",
    };
    const url = "https://c4f0-49-248-167-18.ngrok-free.app/api";

    axios
      .post(url + "/webhook", obj)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    res.json({ success: true, tx: txHash });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getComplaintDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const complaint = await contractInstance.getComplaint(id);
    res.json(complaint);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateToAComplaint = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { userId, subject, description } = req.body;
    const tx = await contractInstance.updateComplaint(
      userId,
      id,
      subject,
      description
    );
    const receipt = await tx.wait();
    const getId = await contractInstance.getLatestComplaintId();
    const finalId = parseInt(getId);

    const obj = {
      event_id: "eg_1",
      event_type: "complaint_update",
      user_id: userId,
      latest_complaint_id: finalId,
      complaint_group_id: id,
      event_created_date: " 2017-01-01 14:56:00",
      complaint_updated_at: " 2017-01-02 14:56:00",
      complaint_status: " open",
      complaint_type: " complaint",
      complaint_created_by: " user_id",
      reporting_agency: " police",
      complaint_documents: "<url of marksheet or the actual marksheet>",
      agency_documents: "<optional field if agency responds with a document>",
      complaint_title: "Lost Original Marsheet",
      complaint_description:
        " My original copy of marksheet has been lost. I want a new one.",
      complaint_created_date: " 2017-01-01 14:58:00",
      agency_response:
        "We are verifying your details. A department official will contact you shortly.",
    };
    const url = "https://c4f0-49-248-167-18.ngrok-free.app/api";

    axios
      .post(url + "/webhook", obj)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(getId);
    res.json({
      success: true,
      txHash: receipt.transactionHash,
      getId: finalId,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  newComplaint,
  getComplaintDetail,
  updateToAComplaint,
};
