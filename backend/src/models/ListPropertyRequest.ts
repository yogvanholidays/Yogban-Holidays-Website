import mongoose, { Schema, Document } from "mongoose";

export interface IListPropertyRequest extends Document {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  propertyName: string;
  propertyLocation: string;
  propertyType: string;
  rooms: string;
  hearAbout: string;
  photosLink: string;
  propertyDescription: string;
}

const ListPropertyRequestSchema: Schema = new Schema({
  userID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  propertyName: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  propertyType: { type: String, required: true },
  rooms: { type: String, required: true },
  hearAbout: { type: String, required: true },
  photosLink: { type: String, required: false },
  propertyDescription: { type: String, required: true },
});

const ListPropertyRequest = mongoose.model<IListPropertyRequest>(
  "ListPropertyRequest",
  ListPropertyRequestSchema
);

export default ListPropertyRequest;
