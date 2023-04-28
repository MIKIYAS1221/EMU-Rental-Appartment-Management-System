import mongoose, { Document, Model, Schema } from 'mongoose';

 export interface IRoom extends Document {
  // apartment: mongoose.Schema.Types.ObjectId;
  // roomID: string;
  roomNumber: string;
  size: number;
  rentAmount: number;
  // images: { url: string }[];
}

const roomSchema: Schema = new mongoose.Schema({
  // apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
  // roomID: { type: String, required: true },
  roomNumber: { type: String, required: true },
  size: { type: Number, required: true },
  rentAmount: { type: Number, required: true },
  // images: [{ url: { type: String, required: true } }],
});
export const Room: Model<IRoom> = mongoose.model<IRoom>('Room', roomSchema);
