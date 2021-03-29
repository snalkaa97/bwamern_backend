const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

/* GET users listing. */
router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);

module.exports = router;
