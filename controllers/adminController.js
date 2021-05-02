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
	editCategory: async (req, res) => {
		const { id, name } = req.body;
		const category = await Category.findOne({ _id: id });
		category.name = name;
		await category.save();
		res.redirect("/admin/category");
	},
	deleteCategory: async (req, res) => {
		const { id } = req.params;
		const category = await Category.findOne({ _id: id });
		await category.remove();
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
