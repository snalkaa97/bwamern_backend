const Category = require("../models/Category");
const Bank = require("../models/Bank");
const fs = require("fs-extra");
const path = require("path");

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
	viewBank: async (req, res) => {
		try {
			const banks = await Bank.find({});
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { alertMessage, alertStatus };
			res.render("admin/bank/view", {
				title: "Bank",
				banks: banks,
				alert,
			});
		} catch (error) {
			res.redirect("/admin/bank");
		}
	},
	addBank: async (req, res) => {
		try {
			const { name, nameBank, nomorRekening } = req.body;
			Bank.create({
				name,
				nameBank,
				nomorRekening,
				imageUrl: `images/${req.file.filename}`,
			});
			req.flash("alertMessage", "Berhasil ditambahkan");
			req.flash("alertStatus", "success");
			res.redirect("/admin/bank");
		} catch (error) {
			req.flash("alertMessage", "Gagal ditambahkan");
			req.flash("alertStatus", "danger");
			res.redirect("/admin/bank");
		}
	},
	editBank: async (req, res) => {
		try {
			const { id, name, nameBank, nomorRekening } = req.body;
			console.log(name);
			const bank = await Bank.findOne({ _id: id });
			if (req.file == undefined) {
				bank.name = name;
				bank.nameBank = nameBank;
				bank.nomorRekening = nomorRekening;
				await bank.save();
				req.flash("alertMessage", "Berhasil diupdate");
				req.flash("alertStatus", "success");
				res.redirect("/admin/bank");
			} else {
				await fs.unlink(path.join(`public/${bank.imageUrl}`));
				bank.name = name;
				bank.nameBank = nameBank;
				bank.nomorRekening = nomorRekening;
				bank.imageUrl = `images/${req.file.filename}`;
				await bank.save();
				req.flash("alertMessage", "Berhasil diupdate");
				req.flash("alertStatus", "success");
				res.redirect("/admin/bank");
			}
		} catch (error) {
			req.flash("alertMessage", "Gagal diupdate");
			req.flash("alertStatus", "danger");
			res.redirect("/admin/bank");
		}
	},
	viewItem: (req, res) => {
		res.render("admin/item/view", { title: "Item" });
	},
	viewBooking: (req, res) => {
		res.render("admin/booking/view", { title: "Booking" });
	},
};
