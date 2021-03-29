import mongoose from "mongoose";
const { Schema } = mongoose;

const featureSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	qty: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Feature", featureSchema); //agar bisa direquire oleh file lain
