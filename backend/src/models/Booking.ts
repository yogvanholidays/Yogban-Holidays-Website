// models/Booking.ts
import mongoose, { Document, Schema } from 'mongoose';
import { HotelType } from '../shared/types';

export interface IBooking extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  hotel:any
}

const BookingSchema = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  hotel: { type: Schema.Types.Mixed, required: true }, 
});

const booking =  mongoose.model<IBooking>('Booking', BookingSchema);
export default booking