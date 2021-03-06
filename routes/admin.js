const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");

/* GET users listing. */
router.get("/dashboard", adminController.viewDashboard);

router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

router.get("/bank", adminController.viewBank);
router.post("/bank", upload, adminController.addBank);
router.put("/bank", upload, adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);

router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);
router.delete("/item/:id", adminController.deleteItem);

router.get("/booking", adminController.viewBooking);

module.exports = router;
