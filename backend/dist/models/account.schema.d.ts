import mongoose from "mongoose";
import { z } from 'zod';
export declare const zodAccountSchema: z.ZodObject<{
    userId: z.ZodString;
    balance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    balance: number;
}, {
    userId: string;
    balance: number;
}>;
export declare const accountModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=account.schema.d.ts.map