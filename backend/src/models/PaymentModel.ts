// models/Payment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  totalCost: number;
  userId: string;
  bookingId: string;
}

const PaymentSchema = new Schema({
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  totalCost: { type: Number, required: true },
  userId: { type: String, required: true },
  bookingId: { type: String, required: true },
});

const payment =  mongoose.model<IPayment>('Payment', PaymentSchema);
export default payment