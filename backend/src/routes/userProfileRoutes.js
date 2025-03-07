const express = require("express");
const router = express.Router();
const { updateUserProfile } = require("../controllers/userProfileController");

router.put("/profile", updateUserProfile);

module.exports = router;
