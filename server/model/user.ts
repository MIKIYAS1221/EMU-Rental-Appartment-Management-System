import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface Avatar {
  public_id: string
  url: string
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: Avatar;
  role: 'tenant' | 'manager' | 'owner' | 'security guard';
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getResetPasswordToken(): string;
}


const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxLength: [50, "Name can't be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ['tenant', 'manager', 'owner', 'security guard'],
    default: 'tenant',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
})
// Hash the password before saving the user
userSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Generate JWT token for user
userSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function (): string {
  const resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetPasswordToken;
};

export default mongoose.model<IUser>('User', userSchema)
