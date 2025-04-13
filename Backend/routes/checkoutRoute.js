import {Router} from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getArtistCheckoutHistory, getSingleCheckoutHistory } from '../controllers/checkoutHistoryController.js';

const router = Router();

// Route to add a like
router.route('/').get( isAuthenticated, getArtistCheckoutHistory);
router.route('/:id').get( isAuthenticated, getSingleCheckoutHistory);



export default router;
