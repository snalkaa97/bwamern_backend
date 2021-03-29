const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

/* GET users listing. */
router.get("/dashboard", adminController.viewDashboard);

module.exports = router;
