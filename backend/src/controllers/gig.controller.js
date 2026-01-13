const Gig = require('../models/Gig.model');

// @desc    Fetch all gigs
// @route   GET /api/gigs
// @access  Public
const getGigs = async (req, res) => {
  try {
    const search = req.query.search || '';

    const gigs = await Gig.find({
      status: 'open',
      title: { $regex: search, $options: 'i' },
    }).populate('ownerId', 'name email');

    res.status(200).json(gigs);
  } catch (error) {
    console.error('Get gigs error:', error);
    res.status(500).json({ message: 'Failed to fetch gigs' });
  }
};

// @desc    Create a gig
// @route   POST /api/gigs
// @access  Private
const createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  const gig = new Gig({
    title,
    description,
    budget,
    ownerId: req.user._id,
  });

  const createdGig = await gig.save();
  res.status(201).json(createdGig);
};

// @desc    Get logged in user gigs
// @route   GET /api/gigs/mygigs
// @access  Private
const getMyGigs = async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id });
  res.json(gigs);
};

// @desc    Get gig by ID
// @route   GET /api/gigs/:id
// @access  Public
const getGigById = async (req, res) => {
  const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');

  if (gig) {
    res.json(gig);
  } else {
    res.status(404);
    throw new Error('Gig not found');
  }
};

module.exports = { getGigs, createGig, getMyGigs, getGigById };
