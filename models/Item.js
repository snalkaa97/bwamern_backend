import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	country: {
		type: String,
		default: "Indonesia",
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	isPopular: {
		type: Boolean,
	},
	decription: {
		type: String,
		required: true,
	},
	imageId: [
		{
			type: ObjectId,
			ref: "Image",
		},
	],
	featureId: [
		{
			type: ObjectId,
			ref: "Feature",
		},
	],
	activityId: [
		{
			type: ObjectId,
			ref: "Activity",
		},
	],
});

module.exports = mongoose.model("Item", itemSchema); //agar bisa direquire oleh file lain
