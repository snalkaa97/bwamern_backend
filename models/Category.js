// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const categorySchema = new Schema({
	id: Object,
	name: {
		type: String,
		required: true,
	},
	itemId: [
		{
			type: ObjectId,
			ref: "Item",
		},
	],
});

module.exports = mongoose.model("Category", categorySchema); //agar bisa direquire oleh file lain
