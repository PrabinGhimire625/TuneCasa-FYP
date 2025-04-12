import {Router} from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getArtistCheckoutHistory } from '../controllers/checkoutHistoryController.js';

const router = Router();

// Route to add a like
router.route('/').get( isAuthenticated, getArtistCheckoutHistory);



export default router;
