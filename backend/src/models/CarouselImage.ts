import mongoose, { Schema, Document } from 'mongoose';

export interface CarouselImageType extends Document {
  imageUrl: string;
  featuredText:string;
  ButtonLink:string;
}

const CarouselImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  featuredText: { type: String, required: true },
  ButtonLink: { type: String, required: true },
});

const CarouselImage = mongoose.model<CarouselImageType>('CarouselImage', CarouselImageSchema);

export default CarouselImage;
