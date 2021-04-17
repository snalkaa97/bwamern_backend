import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
	bookingStartDate: {
		type: Date,
		required: true,
	},
	bookingEndDate: {
		type: Date,
		required: true,
	},
	proofPayment: {
		type: String,
		required: true,
	},
	bankFrom: {
		type: String,
		required: true,
	},
	accountHolder: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	itemId: [
		{
			_id: {
				type: ObjectId,
				ref: "Item",
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			night: {
				type: Number,
				required: true,
			},
		},
	],
	memberId: [
		{
			type: ObjectId,
			ref: "Member",
		},
	],
	bankId: [
		{
			type: ObjectId,
			ref: "Bank",
		},
	],
});

module.exports = mongoose.model("Booking", bookingSchema); //agar bisa direquire oleh file lain
