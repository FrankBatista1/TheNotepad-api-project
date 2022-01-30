
const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/notesController");
const { protect } = require("../middleware/auth");

// router.route("/").get(protect, getPrivateRoute);

module.exports = router;