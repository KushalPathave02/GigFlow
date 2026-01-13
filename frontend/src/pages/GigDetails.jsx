import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGigById } from '../api/gig.api';
import { placeBid, getBidsForGig, hireBid } from '../api/bid.api';
import toast from 'react-hot-toast';
import BidCard from '../components/BidCard';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigDetails = async () => {
      setLoading(true);
      try {
        const gigData = await getGigById(id);
        setGig(gigData);

        if (userInfo && gigData.ownerId._id === userInfo._id) {
          const bidsData = await getBidsForGig(id, userInfo.token);
          setBids(bidsData);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchGigDetails();
  }, [id, userInfo]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    try {
      await placeBid({ gigId: id, message, price }, userInfo.token);
      toast.success('Bid placed successfully!');
      setMessage('');
      setPrice('');
      // Optionally, refresh bids to show the new one immediately
    } catch (error) {
      console.error(error);
    }
  };

  const handleHire = async (bidId) => {
    try {
      await hireBid(bidId, userInfo.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!gig) return <div className="text-center py-10">Gig not found.</div>;

  const isOwner = userInfo && gig.ownerId._id === userInfo._id;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{gig.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Posted by {gig.ownerId.name}</p>
          <p className="text-gray-700 mb-6">{gig.description}</p>
          <div className="text-2xl font-bold text-blue-600">Budget: ${gig.budget}</div>
        </div>
      </div>

      <div className="mt-8">
        {userInfo && !isOwner && gig.status === 'open' && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Place Your Bid</h2>
            <form onSubmit={handlePlaceBid}>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Your Message</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Your Price ($)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">Submit Bid</button>
            </form>
          </div>
        )}

        {isOwner && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bids Received</h2>
            {bids.length > 0 ? (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <BidCard key={bid._id} bid={bid} onHire={handleHire} isOwner={isOwner} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bids have been placed on this gig yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;
