import {Router} from 'express';
import { isAuthenticated, restrictTo, Role } from '../middleware/authMiddleware.js';
import { completeCheckout, fetchAllCompletedCheckout, fetchArtistCompletedCheckoutHistory, fetchRequestedCheckout, fetchSingleRequestedCheckout, requestCheckout } from '../controllers/checkoutHistoryController.js';


const router = Router();


router.route('/').post( isAuthenticated, requestCheckout)

router.route('/requested').get( isAuthenticated,restrictTo(Role.Admin), fetchRequestedCheckout );
router.route('/completed').get(fetchAllCompletedCheckout );
router.route('/artist/completed').get(isAuthenticated,fetchArtistCompletedCheckoutHistory );

router.route('/:checkoutId').get( fetchSingleRequestedCheckout);
router.route('/completed/:checkoutId').patch( isAuthenticated,restrictTo(Role.Admin), completeCheckout);


export default router;
