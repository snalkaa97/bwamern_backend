const Category = require("../models/Category");

module.exports = {
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view", { title: "Dashboard" });
	},
	viewCategory: async (req, res) => {
		try {
			const categories = await Category.find({});
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { alertMessage, alertStatus };
			res.render("admin/category/view", {
				title: "Category",
				categories: categories,
				alert,
			});
		} catch (error) {
			res.redirect("/admin/category");
		}
	},
	addCategory: async (req, res) => {
		try {
			const { name } = req.body;
			// console.log(name);
			Category.create({ name });
			req.flash("alertMessage", "Berhasil ditambahkan");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {
			req.flash("alertMessage", "Gagal ditambahkan");
			req.flash("alertStatus", "danger");
			res.redirect("/admin/category");
		}
	},
	editCategory: async (req, res) => {
		try {
			const { id, name } = req.body;
			const category = await Category.findOne({ _id: id });
			category.name = name;
			await category.save();
			req.flash("alertMessage", "Berhasil diupdate");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {
			req.flash("alertMessage", "Gagal diupdate");
			req.flash("alertStatus", "danger");
			res.redirect("/admin/category");
		}
	},
	deleteCategory: async (req, res) => {
		try {
			const { id } = req.params;
			const category = await Category.findOne({ _id: id });
			await category.remove();
			req.flash("alertMessage", "Berhasil dihapus");
			req.flash("alertStatus", "success");
			res.redirect("/admin/category");
		} catch (error) {
			req.flash("alertMessage", "Gagal diupdate");
			req.flash("alertStatus", "danger");
			res.redirect("/admin/category");
		}
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
