const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");

/* GET users listing. */
router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);
router.get("/bank", adminController.viewBank);
router.post("/bank", upload, adminController.addBank);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

module.exports = router;
