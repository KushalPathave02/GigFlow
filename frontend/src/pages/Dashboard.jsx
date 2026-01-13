import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMyGigs } from '../api/gig.api';
import { getMyBids } from '../api/bid.api';
import GigCard from '../components/GigCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [myGigs, setMyGigs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const gigsData = await getMyGigs(userInfo.token);
        setMyGigs(gigsData);
        const bidsData = await getMyBids(userInfo.token);
        setMyBids(bidsData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    if (userInfo) {
      fetchDashboardData();
    }
  }, [userInfo]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Posted Gigs</h2>
          <div className="space-y-4">
            {myGigs.length > 0 ? (
              myGigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
            ) : (
              <p className="text-gray-500">You haven't posted any gigs yet.</p>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Bids</h2>
          <div className="space-y-4">
            {myBids.length > 0 ? (
              myBids.filter(bid => bid.gigId).map((bid) => (
                <div key={bid._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700">On gig: <Link to={`/gig/${bid.gigId._id}`} className="text-blue-600 hover:underline">{bid.gigId.title}</Link></p>
                  <p className={`text-sm font-medium ${bid.status === 'hired' ? 'text-green-600' : 'text-gray-600'}`}>
                    Status: {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You haven't placed any bids yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
