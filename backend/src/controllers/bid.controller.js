const mongoose = require('mongoose');
const Bid = require('../models/Bid.model');
const Gig = require('../models/Gig.model');

// @desc    Place a bid on a gig
// @route   POST /api/bids
// @access  Private
const placeBid = async (req, res) => {
  const { gigId, message, price } = req.body;

  const gig = await Gig.findById(gigId);

  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }

  if (gig.status === 'assigned') {
    res.status(400);
    throw new Error('Gig is already assigned');
  }

  const bid = new Bid({
    gigId,
    freelancerId: req.user._id,
    message,
    price,
  });

  const createdBid = await bid.save();
  res.status(201).json(createdBid);
};

// @desc    View bids for a gig
// @route   GET /api/bids/:gigId
// @access  Private (gig owner only)
const viewBids = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);

  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }

  if (gig.ownerId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to view bids for this gig');
  }

  const bids = await Bid.find({ gigId: req.params.gigId }).populate('freelancerId', 'name email');
  res.json(bids);
};

// @desc    Hire a freelancer for a gig
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (gig owner only)
const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);

    if (!bid) {
      throw new Error('Bid not found');
    }

    const gig = await Gig.findById(bid.gigId).session(session);

    if (!gig) {
      throw new Error('Gig not found');
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error('Not authorized to hire for this gig');
    }

    if (gig.status === 'assigned') {
      throw new Error('Gig is already assigned');
    }

    gig.status = 'assigned';
    await gig.save({ session });

    bid.status = 'hired';
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: bid.gigId, _id: { $ne: bid._id } },
      { $set: { status: 'rejected' } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Freelancer hired successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user bids
// @route   GET /api/bids/mybids
// @access  Private
const getMyBids = async (req, res) => {
  const bids = await Bid.find({ freelancerId: req.user._id }).populate('gigId', 'title _id');
  res.json(bids);
};

module.exports = { placeBid, viewBids, hireBid, getMyBids };
