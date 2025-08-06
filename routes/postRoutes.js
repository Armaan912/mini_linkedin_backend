import express from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { createPost, getFeed, getMyPosts, getUserPosts, toggleLike, addComment, editComment, deleteComment, getPostById } from '../controllers/postController.js';

const router = express.Router();

router.post('/', auth, upload.single('image'), createPost);
router.get('/feed', getFeed);
router.get('/me', auth, getMyPosts);
router.get('/user/:userId', getUserPosts);
router.get('/:id', getPostById);
router.patch('/:id/like', auth, toggleLike);
router.post('/:id/comment', auth, addComment);
router.put('/:id/comment', auth, editComment);
router.delete('/:id/comment', auth, deleteComment);

export default router;
