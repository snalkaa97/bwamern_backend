import mongoose from "mongoose";
const { Schema } = mongoose;

const memberSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Member", memberSchema); //agar bisa direquire oleh file lain
