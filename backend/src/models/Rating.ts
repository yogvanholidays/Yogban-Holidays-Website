import mongoose, { Document, Schema } from 'mongoose';

export interface RatingDocument extends Document {
  bookingdotcom:string;
  airbnb:string;
  makemytrip:string;
  googleTravel:string;
  agoda:string;
}

const ratingSchema = new Schema({
  bookingdotcom: {
    type: String,
    required: true,
  },
  airbnb: {
    type: String,
    required: true,
  },
  makemytrip: {
    type: String,
    required: true,
  },
  googleTravel: {
    type: String,
    required: true,
  },
  agoda: {
    type: String,
    required: true,
  },
});

const Rating = mongoose.model<RatingDocument>('Rating', ratingSchema);

export default Rating;
