import mongoose, { Schema } from "mongoose";
import { z } from 'zod';
export const zodAccountSchema = z.object({
    userId: z.string().min(1),
    balance: z.number().min(0),
});
const accountSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    balance: { type: Number, required: true }
});
export const accountModel = mongoose.model('accounts', accountSchema);
//# sourceMappingURL=account.schema.js.map