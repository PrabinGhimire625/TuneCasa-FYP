import {Router} from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { completeCheckout, fetchAllCompletedCheckout, fetchArtistCompletedCheckoutHistory, fetchRequestedCheckout, fetchSingleRequestedCheckout, requestCheckout } from '../controllers/checkoutHistoryController.js';


const router = Router();

// Route to add a like
router.route('/').post( isAuthenticated, requestCheckout)

router.route('/requested').get(fetchRequestedCheckout );
router.route('/completed').get(fetchAllCompletedCheckout );
router.route('/artist/completed').get(isAuthenticated,fetchArtistCompletedCheckoutHistory );

//router.route('/:id').get( isAuthenticated, getSingleCheckoutHistory);
router.route('/:checkoutId').get( fetchSingleRequestedCheckout);
router.route('/completed/:checkoutId').patch( completeCheckout);


export default router;
