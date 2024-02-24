import mongoose, { Schema, Document } from 'mongoose';

export interface DestinationType extends Document {
  name: string;
  illustrationImageUrl: string;
}

const DestinationSchema: Schema = new Schema({
  name: { type: String, required: true },
  illustrationImageUrl: { type: String, required: false },
});

const Destination = mongoose.model<DestinationType>('Destination', DestinationSchema);

export default Destination;
