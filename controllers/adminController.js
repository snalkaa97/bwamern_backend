module.exports = {
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view", { title: "Dashboard" });
	},
	viewCategory: (req, res) => {
		res.render("admin/category/view", { title: "Category" });
	},
};
