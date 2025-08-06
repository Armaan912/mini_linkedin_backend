import express from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { getMe, updateProfile, getUserProfile, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', auth, getMe);
router.put('/profile', auth, upload.single('profileImage'), updateProfile);
router.get('/', auth, getAllUsers);
router.get('/:id', getUserProfile);

export default router;
