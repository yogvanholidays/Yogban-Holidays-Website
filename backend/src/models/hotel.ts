import mongoose, { Schema } from "mongoose";
import { HotelType } from "../shared/types";



const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  amenities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  reviews: { type: Schema.Types.Mixed, required: false },
  bookingdotcom: [{ type: String, required: false }],
  airbnb: [{ type: String, required: false }],
  makemytrip: [{ type: String, required: false }],
  googleTravels: [{ type: String, required: false }],
  agoda: [{ type: String, required: false }],
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;