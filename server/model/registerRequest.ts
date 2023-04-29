//registerRequest model using mongoose
import mongoose, { Schema } from 'mongoose';

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

const RegisterRequestSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

export default mongoose.model<IRegisterRequest>('RegisterRequest', RegisterRequestSchema);
