import './db/index.js';
import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import transactionRouter from './routes/transaction.route.js';
import dotenv from 'dotenv';
import detailsRouter from './routes/details.route.js';
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', transactionRouter);
app.use('/api/v1', detailsRouter);
app.listen(3000, () => {
    console.log('Backend listening on 3000');
});
//# sourceMappingURL=index.js.map