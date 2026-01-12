const express = require('express');
const router = express.Router();
const { placeBid, viewBids, hireBid, getMyBids } = require('../controllers/bid.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').post(protect, placeBid);
router.route('/mybids').get(protect, getMyBids);
router.route('/:gigId').get(protect, viewBids);
router.route('/:bidId/hire').patch(protect, hireBid);

module.exports = router;
