import express, { Router } from 'express';
import { signInController, signUpController } from '../controller/authController.js';
import { validateUser } from '../controller/authController.js';
const router = Router();
router.use(express.json());
router.get('/health', (req, res) => {
    res.send("Hello");
});
router.post('/signup', signUpController);
router.post('/login', signInController);
router.get('/validate', validateUser);
export default router;
//# sourceMappingURL=auth.route.js.map