import {Router} from 'express';
import { addLike, getLikes, deleteLike } from '../controllers/likeController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

// Route to add a like
router.route('/:songId').post( isAuthenticated, addLike);
router.route('/').get( isAuthenticated, getLikes);
router.route('/:songId').delete( isAuthenticated, deleteLike);



export default router;
