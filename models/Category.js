// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
	id: Object,
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Category", categorySchema); //agar bisa direquire oleh file lain
