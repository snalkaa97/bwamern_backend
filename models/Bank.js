import mongoose from "mongoose";
const { Schema } = mongoose;

const bankSchema = new Schema({
	nameBank: {
		type: String,
		required: true,
	},
	rekening: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Bank", bankSchema); //agar bisa direquire oleh file lain
