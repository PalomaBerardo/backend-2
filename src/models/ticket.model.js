import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema(
    {
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true, min: 0 },
    purchaser: { type: String, required: true, lowercase: true, trim: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'orders' }
    },
    { timestamps: true }
);

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
