const express = require('express');
const router = express.Router();
const { getGigs, createGig, getMyGigs, getGigById } = require('../controllers/gig.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/mygigs').get(protect, getMyGigs);
router.route('/').get(getGigs).post(protect, createGig);
router.route('/:id').get(getGigById);

module.exports = router;
