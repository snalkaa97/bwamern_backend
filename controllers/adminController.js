const Category = require("../models/Category");

module.exports = {
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view", { title: "Dashboard" });
	},
	viewCategory: async (req, res) => {
		const categories = await Category.find({});
		res.render("admin/category/view", {
			title: "Category",
			categories: categories,
		});
	},
	addCategory: async (req, res) => {
		const { name } = req.body;
		// console.log(name);
		Category.create({ name });
		res.redirect("/admin/category");
	},
	viewBank: (req, res) => {
		res.render("admin/bank/view", { title: "Bank" });
	},
	viewItem: (req, res) => {
		res.render("admin/item/view", { title: "Item" });
	},
	viewBooking: (req, res) => {
		res.render("admin/booking/view", { title: "Booking" });
	},
};
