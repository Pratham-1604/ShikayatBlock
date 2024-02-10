const ethers = require("ethers");
const { providers } = require("ethers");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

app.use(bodyParser.json());

// Endpoint to create a new complaint
app.post("/complaints", async (req, res) => {
  try {
    const { userId, subject, description } = req.body;
    const tx = await contractInstance.submitComplaint(
      userId,
      subject,
      description
    );
    const receipt = await tx.wait();
    const txHash = receipt.transactionHash;
    res.json({ success: true, tx: txHash });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to get details of a specific complaint
app.get("/complaints/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const complaint = await contractInstance.getComplaint(id);
    res.json(complaint);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to update a complaint
app.put("/complaints/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { userId, subject, description } = req.body;
    const tx = await contractInstance.updateComplaint(userId, id, subject, description);
    const response =  tx.wait();
    
    res.json({ success: true, txHash: response.hash });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("API server is listening on port", port);
});
