import { Router } from 'express';
import { userModel } from '../models/users.schema.js';

const router = Router();

router.get('/details/all', async (req, res) => {
  try {
    const results = await userModel.find();
    const users = results.map(find => ({
      firstname: find.firstName,
      lastname: find.lastName,
      username: find.username
    }));
    return res.status(200).json({
      success: true,
      users: users,  
      message: "Retrieved users"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});
export default router;