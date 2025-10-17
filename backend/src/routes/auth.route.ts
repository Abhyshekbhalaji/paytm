import express,{type Request,type Response,Router}from 'express';
import { signInController, signUpController } from '../controller/authController.js';
import { validateUser } from '../controller/authController.js';

const router = Router();

router.use(express.json());
router.get('/health',(req:Request,res:Response)=>{
res.send("Hello");

})

router.post('/signup',signUpController);
router.post('/login',signInController);
router.get('/validate' ,validateUser)

export default router;