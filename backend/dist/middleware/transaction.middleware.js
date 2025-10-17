import {} from 'express';
import { userModel } from '../models/users.schema.js';
import jwt from 'jsonwebtoken';
import { accountModel } from '../models/account.schema.js';
export const transactionMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!process.env.SECRET_KEY) {
            return res.status(403).json({
                success: 'false',
                message: 'Failed at transaction middleware'
            });
        }
        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
        let userId;
        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            userId = decoded.userId;
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Invalid token payload"
            });
        }
        let fromUserAccount = await accountModel.findOne({ userId: userId });
        let user = req.body.toUser;
        let toUser = await userModel.findOne({ username: user });
        if (!toUser) {
            return res.status(400).json({
                message: "To User not found",
                success: false
            });
        }
        let toUserAccount = await accountModel.findOne({ userId: toUser._id });
        if (!fromUserAccount || !toUserAccount) {
            return res.status(403).json({
                success: false,
                message: "Accounts doesnt exist "
            });
        }
        req.body.toUserDoc = toUserAccount;
        req.body.fromUserDoc = fromUserAccount;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};
//# sourceMappingURL=transaction.middleware.js.map