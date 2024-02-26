import mongoose, { Document, Schema } from 'mongoose';

export interface RatingDocument extends Document {
  rating: string;
}

const ratingSchema = new Schema({
  rating: {
    type: String,
    required: true,
  },
});

const Rating = mongoose.model<RatingDocument>('Rating', ratingSchema);

export default Rating;
