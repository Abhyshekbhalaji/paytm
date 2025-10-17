import { Router } from 'express';
import { transactionMiddleware } from '../middleware/transaction.middleware.js';
import { getBalanceFromTheUser, handlePayment } from '../controller/transactionController.js';
import { authMiddleware } from '../middleware/auth.middleWare.js';
const router = Router();
router.post('/pay', transactionMiddleware, handlePayment);
router.get('/balance', authMiddleware, getBalanceFromTheUser);
export default router;
//# sourceMappingURL=transaction.route.js.map