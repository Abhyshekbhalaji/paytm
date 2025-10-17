import {} from 'express';
import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(402).json({
            success: false,
            message: "Login before accessing this route"
        });
    }
    if (!process.env.SECRET_KEY) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    let userId;
    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
        userId = decoded.userId;
    }
    else {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
    req.body.userId = userId;
    next();
};
//# sourceMappingURL=auth.middleWare.js.map