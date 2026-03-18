import express from 'express';
import {getMyProfile} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', verifyToken,getMyProfile);

export default router;