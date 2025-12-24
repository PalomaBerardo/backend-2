import mongoose from 'mongoose';

const businessCollection = 'businesses';

const productSubSchema = new mongoose.Schema(
    {
    id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 }
    },
    { _id: false }
);

const businessSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, trim: true },
    products: { type: [productSubSchema], default: [] }
    },
    { timestamps: true }
);

export const businessModel = mongoose.model(businessCollection, businessSchema);