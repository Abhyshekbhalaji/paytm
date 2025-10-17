import {type Request,type Response} from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { userModel, type User } from '../models/users.schema.js';
import { accountModel } from '../models/account.schema.js';
export const editingUserCredentials= async(req:Request,res:Response)=>{
try {
    
    let {firstName,lastName, password} = req.body;

let token = req.cookies.token;

if(!process.env.SECRET_KEY){
    return res.status(500).json({
        success:false,
        message:"Dotenv fucked you bro"
    })
}

let decoded = jwt.verify(token, process.env.SECRET_KEY);
let userId: string | undefined;
if (typeof decoded !== "string" && "userId" in decoded) {
    userId = (decoded as JwtPayload).userId as string;
} else {
    return res.status(401).json({
        success: false,
        message: "Invalid token"
    });
}

let user:User | null= await userModel.findById({_id:userId});

if(user && firstName){
user.firstName =firstName;
}
if(user && lastName){
    user.lastName=lastName;
}
if(user && password){
    user.password=bcrypt.hashSync(password,12);
}
await user?.save();

return res.status(200).json({
    message:"User has been updated",
    success:true
})  
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal server Error"
    })
}


}

export const filterByParams = async(req:Request,res:Response)=>{
    try {
        const content = req.query.filter as string;
        const users= await userModel.find({
            $or:[
                { firstName: { $regex: content, $options: 'i' } },
                { lastName: { $regex: content, $options: 'i' } },
                { username: { $regex: content, $options: 'i' } }
            ]
        })

        if(users && users.length>0){
            return res.status(200).json({
                success:true,
                users
            })
        }
        return res.status(404).json({
            success:false,
            message:"No user found"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}

export const getUserDetails=async(req:Request,res:Response)=> {

        let userId= req.body.userId;
        try {
                let re=await userModel.findById({_id:userId});
                let accountDetails= await accountModel.findOne({userId:userId});
                if(!re){
                    return res.status(403).json({
                        message:"No user in the database",
                        user:null,
                        success:false
                    })
                }
                  if(!accountDetails){
                    return res.status(403).json({
                        message:"No accounts in the database",
                        user:null,
                        success:false
                    })
                }
                return res.status(203).json({
                    message:"User details retrieved",
                    success:true,
                    user:re,
                    accountDetails
                })
        } catch (error) {
                return res.status(500).json({
                    message:"Internal server error" ,
                    success:false,
                    user:null
                })
        }
}