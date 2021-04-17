module.exports = {
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view", { title: "Dashboard" });
	},
	viewCategory: (req, res) => {
		res.render("admin/category/view", { title: "Category" });
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
