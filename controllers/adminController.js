module.exports = {
	viewDashboard: (req, res) => {
		res.render("admin/dashboard/view", { title: "Dashboard" });
	},
};
