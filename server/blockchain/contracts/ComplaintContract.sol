pragma solidity ^0.8.0;

// // Importing IPFS library
// import "./IPFSStorage.sol";

contract ComplaintContract {
    // Struct to represent a complaint
    struct ComplaintContract {
        string userId; // User ID of the complainant
        uint256 complaintGroupId; // Group ID of the complaint
        uint256 complaintId; // Complaint ID
        string subject; // Subject of the complaint
        string description; // Description of the complaint
        string ipfsHash; // IPFS hash of the complaint details
    }

    // Mapping to store complaints
    mapping(uint256 => ComplaintContract) public complaints;

    // Counter for generating complaint IDs
    uint256 public complaintCount;

    // Counter for generating complaint group ids
    uint256 public complaintGroupCount;

    // Event to emit when a new complaint is submitted
    event NewComplaint(
        string userId,
        uint256 indexed complaintGroupId,
        uint256 indexed complaintId,
        string subject,
        string description,
        string ipfsHash
    );

    // Function to submit a new complaint
    function submitComplaint(
        string memory  _userId,
        string memory _subject,
        string memory _description,
        string memory _ipfs
    ) public {
        // Incrementing complaint count
        complaintCount++;
        complaintGroupCount++;

        // Creating a new complaint object
        ComplaintContract memory newComplaint = ComplaintContract({
            userId: _userId,
            complaintGroupId: complaintGroupCount,
            complaintId: complaintCount,
            subject: _subject,
            description: _description,
            ipfsHash: _ipfs
        });

        // // Storing complaint details on IPFS and getting the hash
        // string memory ipfsHash = ipfsStorage.storeData(abi.encode(newComplaint));

        // Updating IPFS hash in the complaint object
        // newComplaint.ipfsHash = ipfsHash;

        // Storing the complaint object
        complaints[complaintCount] = newComplaint;

        // Emitting event
        emit NewComplaint(
            _userId,
            complaintGroupCount,
            complaintCount,
            _subject,
            _description,
            _ipfs
        );
    }

    // Function to update an existing complaint
    function updateComplaint(
        string memory userId,
        uint256 complaintGroupId,
        string memory _subject,
        string memory _description,
        string memory _ipfs
    ) public {
        // Incrementing complaint count for the new complaint object
        complaintCount++;

        // Creating a new complaint object for the updated information
        ComplaintContract memory newComplaint = ComplaintContract({
            userId: userId,
            complaintGroupId: complaintGroupId,
            complaintId: complaintCount,
            subject: _subject,
            description: _description,
            ipfsHash: _ipfs
        });

        complaints[complaintCount] = newComplaint;

        // Emitting event
        emit NewComplaint(
            userId,
            complaintGroupId,
            complaintCount,
            _subject,
            _description,
            _ipfs
        );
    }

    // Function to retrieve complaint details using complaint ID
    function getComplaint(
        uint256 _complaintId
    )
        public
        view
        returns (string memory, uint256, string memory, string memory, string memory)
    {
        ComplaintContract memory complaint = complaints[_complaintId];
        return (
            complaint.userId,
            complaint.complaintGroupId,
            complaint.subject,
            complaint.description,
            complaint.ipfsHash
        );
    }

    // Function to retrieve latest complaint ID
    function getLatestComplaintId() public view returns (uint256) {
        return (complaintCount);
    }
}
