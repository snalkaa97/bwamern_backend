const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Item = require("../models/Item");
const Image = require("../models/Image");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
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
			req.flash("alertMessage", `${error.message}`);
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
			req.flash("alertMessage", `${error.message}`);
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
			req.flash("alertMessage", `${error.message}`);
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
			req.flash("alertMessage", `${error.message}`);
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
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/bank");
		}
	},
	deleteBank: async (req, res) => {
		try {
			const { id } = req.params;
			const bank = await Bank.findOne({ _id: id });
			await fs.unlink(path.join(`public/${bank.imageUrl}`));
			await bank.remove();
			req.flash("alertMessage", "Berhasil dihapus");
			req.flash("alertStatus", "success");
			res.redirect("/admin/bank");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/bank");
		}
	},
	viewItem: async (req, res) => {
		try {
			const items = await Item.find()
				.populate({ path: "imageId", select: "id imageUrl" })
				.populate({ path: "categoryId", select: "id name" });
			const categories = await Category.find({});
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { alertMessage, alertStatus };
			res.render("admin/item/view", {
				title: "Item",
				categories: categories,
				alert,
				items,
				action: "view",
			});
		} catch (error) {
			res.redirect("/admin/item");
		}
	},
	addItem: async (req, res) => {
		try {
			const { categoryId, title, price, city, about } = req.body;
			if (req.files.length > 0) {
				const category = await Category.findOne({ _id: categoryId });
				const newItem = {
					categoryId: category._id,
					title,
					description: about,
					price,
					city,
				};
				const item = await Item.create(newItem);
				category.itemId.push({ _id: item._id });
				await category.save();

				for (let i = 0; i < req.files.length; i++) {
					const imageSave = await Image.create({
						imageUrl: `images/${req.files[i].filename}`,
					});
					item.imageId.push({ _id: imageSave._id });
					await item.save();
				}
				req.flash("alertMessage", "Berhasil ditambahkan");
				req.flash("alertStatus", "success");
				res.redirect("/admin/item");
			}
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/item");
		}
	},
	showImageItem: async (req, res) => {
		try {
			const { id } = req.params;
			const items = await Item.findOne({ _id: id }).populate({
				path: "imageId",
				select: "id imageUrl",
			});
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { alertMessage, alertStatus };
			res.render("admin/item/view", {
				title: "Show Image Item",
				alert,
				items,
				action: "show image",
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/item");
		}
	},
	showEditItem: async (req, res) => {
		try {
			const { id } = req.params;
			const item = await Item.findOne({ _id: id })
				.populate({
					path: "imageId",
					select: "id imageUrl",
				})
				.populate({ path: "categoryId", select: "id name" });
			const categories = await Category.find({});
			const alertMessage = req.flash("alertMessage");
			const alertStatus = req.flash("alertStatus");
			const alert = { alertMessage, alertStatus };
			res.render("admin/item/view", {
				title: "Edit Item",
				alert,
				item,
				categories,
				action: "edit",
			});
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/item");
		}
	},
	editItem: async (req, res) => {
		try {
			const { id } = req.params;
			const { categoryId, title, price, city, about } = req.body;
			const item = await Item.findOne({ _id: id })
				.populate({
					path: "imageId",
					select: "id imageUrl",
				})
				.populate({ path: "categoryId", select: "id name" });
			if (req.files.length > 0) {
				if (req.files.length >= item.imageId.length) {
					for (let i = 0; i < req.files.length; i++) {
						try {
							const imageUpdate = await Image.findOne({
								_id: item.imageId[i]._id,
							});
							await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
							imageUpdate.imageUrl = `images/${req.files[i].filename}`;
							await imageUpdate.save();
						} catch (error) {
							const imageSave = await Image.create({
								imageUrl: `images/${req.files[i].filename}`,
							});
							item.imageId.push({ _id: imageSave._id });
							await item.save();
						}
					}
				} else {
					for (let i = 0; i < item.imageId.length; i++) {
						try {
							const imageUpdate = await Image.findOne({
								_id: item.imageId[i]._id,
							});
							await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
							_.pull(item.imageId, i);
							await item.save();
						} catch (error) {}
					}
					for (let i = 0; i < req.files.length; i++) {
						const imageSave = await Image.create({
							imageUrl: `images/${req.files[i].filename}`,
						});
						item.imageId.push({ _id: imageSave._id });
						await item.save();
					}
				}
				item.title = title;
				item.price = price;
				item.city = city;
				item.about = about;
				item.categoryId = categoryId;
				await item.save();
				req.flash("alertMessage", "Berhasil diupdate");
				req.flash("alertStatus", "success");
				res.redirect("/admin/item");
			} else {
				item.title = title;
				item.price = price;
				item.city = city;
				item.about = about;
				item.categoryId = categoryId;
				await item.save();
				req.flash("alertMessage", "Berhasil diupdate");
				req.flash("alertStatus", "success");
				res.redirect("/admin/item");
			}
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/item");
		}
	},
	deleteItem: async (req, res) => {
		try {
			const { id } = req.params;
			const item = await Item.findOne({ _id: id }).populate("imageId");
			for (let i = 0; i < item.imageId.length; i++) {
				Image.findOne({ _id: item.imageId[i]._id })
					.then((image) => {
						fs.unlink(path.join(`public/${image.imageUrl}`));
						image.remove();
					})
					.catch((error) => {
						req.flash("alertMessage", `${error.message}`);
						req.flash("alertStatus", "danger");
						res.redirect("/admin/item");
					});
			}
			await item.remove();
			req.flash("alertMessage", "Berhasil diupdate");
			req.flash("alertStatus", "success");
			res.redirect("/admin/item");
		} catch (error) {
			req.flash("alertMessage", `${error.message}`);
			req.flash("alertStatus", "danger");
			res.redirect("/admin/item");
		}
	},
	viewBooking: (req, res) => {
		res.render("admin/booking/view", { title: "Booking" });
	},
};
