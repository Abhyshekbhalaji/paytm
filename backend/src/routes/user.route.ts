import  {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleWare.js';
import { editingUserCredentials, filterByParams, getUserDetails } from '../controller/userController.js';
const router= Router();

router.post('/',authMiddleware,editingUserCredentials);
router.get('/',authMiddleware,filterByParams);
router.get('/details' ,authMiddleware, getUserDetails);

export default router;


