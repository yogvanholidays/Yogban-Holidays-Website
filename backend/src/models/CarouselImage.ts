import mongoose, { Schema, Document } from 'mongoose';

export interface CarouselImageType extends Document {
  imageUrl: string;
}

const CarouselImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
});

const CarouselImage = mongoose.model<CarouselImageType>('CarouselImage', CarouselImageSchema);

export default CarouselImage;
