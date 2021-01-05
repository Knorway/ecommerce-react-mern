import express from 'express';
import {
	authUser,
	getUserProfile,
	getUsers,
	resgisterUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(resgisterUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
