const router = require("express").Router();
const { newComplaint, getComplaintDetail, updateToAComplaint } = require("../controllers/blockchain_crud");

// Endpoint to create a new complaint
router.post("/complaints", newComplaint);

// Endpoint to get details of a specific complaint
router.get("/complaints/:id", getComplaintDetail);

// Endpoint to update a complaint
router.put("/complaints/:id", updateToAComplaint);

module.exports = router;