import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
    },
    { timestamps: true }
);

export const userModel = mongoose.model(userCollection, userSchema);
