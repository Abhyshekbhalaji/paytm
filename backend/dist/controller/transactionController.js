import {} from "express";
import mongoose from "mongoose";
import { accountModel } from "../models/account.schema.js";
export const handlePayment = async (req, res) => {
    try {
        let { fromUserDoc, toUserDoc, amount } = req.body;
        if (fromUserDoc.balance < amount) {
            return res.status(402).json({
                message: "Transaction failed due to low funds",
                success: false,
            });
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            fromUserDoc.balance -= amount;
            toUserDoc.balance += amount;
            await fromUserDoc.save({ session });
            await toUserDoc.save({ session });
            await session.commitTransaction();
            session.endSession();
            return res.status(203).json({
                message: "Transaction succeeded",
                success: true
            });
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
                message: "Transaction Failed",
                success: false
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const getBalanceFromTheUser = async (req, res) => {
    let userId = req.body.userId;
    let account = await accountModel.findOne({ userId: userId });
    if (!account) {
        return res.status(403).json({
            message: "User account was not found",
            success: false
        });
    }
    return res.status(203).json({
        message: "Retrieved balance for the user",
        success: true,
        balance: account.balance
    });
};
//# sourceMappingURL=transactionController.js.map