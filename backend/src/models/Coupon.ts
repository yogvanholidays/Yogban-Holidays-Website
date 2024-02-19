import mongoose, { Schema } from "mongoose";

const couponSchema = new mongoose.Schema({
  couponType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  couponCode: {
    type: String,
    required: true
  },
  couponMessage: {
    type: String,
    required: true
  },
  minNights: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Schema.Types.Mixed,
    required: false
  },
  neverExpires: {
    type: Boolean,
    required: false
  },
  creationDate: {
    type: String,
    required: true
  },
});

// Create the Coupon model
const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
