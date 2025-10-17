
import {type Request, type Response,type NextFunction} from 'express';

import jwt from 'jsonwebtoken';

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(402).json({
            success:false,
            message:"Login before accessing this route"
        })
    }

    if(!process.env.SECRET_KEY){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    let userId: string | undefined;

    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
        userId = (decoded as jwt.JwtPayload).userId as string;
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    req.body.userId = userId;
    next();
}