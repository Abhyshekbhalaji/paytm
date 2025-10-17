import mongoose, { Document } from 'mongoose';
import { z } from 'zod';
export interface User extends Document {
    username: String;
    firstName: String;
    lastName: String;
    password: string;
}
export declare const userZodSchema: z.ZodObject<{
    username: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}, {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}>;
export declare const userModel: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=users.schema.d.ts.map