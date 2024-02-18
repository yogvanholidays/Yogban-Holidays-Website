import mongoose, { Schema, Document } from 'mongoose';

export interface DestinationType extends Document {
  name: string;
  illustrationImageUrl: string;
}

const DestinationSchema: Schema = new Schema({
  name: { type: String, required: true },
  illustrationImageUrl: { type: String, required: true },
});

const Destination = mongoose.model<DestinationType>('Destination', DestinationSchema);

export default Destination;
