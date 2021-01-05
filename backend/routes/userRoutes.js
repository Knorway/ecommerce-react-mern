import express from 'express';
import {
	authUser,
	deleteUser,
	getUserById,
	getUserProfile,
	getUsers,
	resgisterUser,
	updateUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(resgisterUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
	.delete(protect, admin, deleteUser);

export default router;
