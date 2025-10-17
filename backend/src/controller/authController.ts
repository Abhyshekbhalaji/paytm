import {type Request,type Response,Router}from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/users.schema.js';
import { userZodSchema } from '../models/users.schema.js';
import { accountModel } from '../models/account.schema.js';




export const signUpController=async(req:Request,res:Response)=>{

try {
    let parseResult = userZodSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({
            success: false,
            message: "Zod validation failed",
            details: parseResult.error.errors
        });
    }



    const {username,password,firstName,lastName}=parseResult.data;
    let pass_hash=bcrypt.hashSync(password,12);

    let user =await userModel.create({
        username,firstName,password:pass_hash,lastName
    })
    if(!user){
        return res.status(411).json({
            error:'User creation failed',
            success:false,
        })
    }
        let acc=await accountModel.create({
            userId:user,
            balance:1+Math.random()*10000
        })

        if(!acc){
            return res.status(500).json({
                message:"Account creation failed for this user",
                success:false,
            })
        }
    return res.status(201).json({
        message:"User creation success",
        success:true
    })

} catch (error:any) {
     return res.status(500).json({
            error:'Internal server error',
            success:false,
            details:error.message
        })
}
}
export const signInController = async(req:Request,res:Response)=>{
    try {
        let {username, password} =req.body;
        let user=await userModel.findOne({username});
        if(!user){
            return res.status(402).json({
                message:"No user found in db",
                success:false
            })  
        }
        let pass_hash = bcrypt.compareSync(password,user.password);
        if(!pass_hash){
             return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }

        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                message: "JWT secret key is not defined",
                success: false
            });
        }
        let token = jwt.sign({userId: user._id}, process.env.SECRET_KEY as string);
        res.cookie('token' ,token,{
            httpOnly:true,
            sameSite:'lax',
            secure:process.env.NODE_ENV ==='production',
            maxAge:60*60*1000,

        })
        return res.status(201).json({
            message:"Logged in as "+user.username,
            success:true
        })

    
    } catch (error) {
        return res.status(500).json({
            message:"Internal server Error",
            success:false
        })
    }
}

export const validateUser=(req:Request,res:Response)=>{
      const token = req.cookies.token;

  if (!token) return res.status(401).json({ loggedIn: false });

  try {

    if(!process.env.SECRET_KEY){
        return res.status(403).json({
            message:"failed",
            loggedIn:false,
            success:false
        })
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
}