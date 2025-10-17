import mongoose,{Schema,Document} from 'mongoose';
import {z} from 'zod';
export interface User extends Document{
    username:String,
    firstName:String,
    lastName:String,
    password:string,
}


export const userZodSchema = z.object({
    username:z.string().min(5).max(30),
    firstName: z.string().min(5).max(30),
    lastName: z.string().min(5).max(30),
    password: z.string().min(5).max(15)
});




const userSchemaDefinition = {
    username:{type:String,required:true,unique:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
};

const userSchema = new Schema<User>(userSchemaDefinition);
export const userModel = mongoose.model<User>('users',userSchema);
