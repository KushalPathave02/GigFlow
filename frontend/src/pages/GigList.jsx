import { useState, useEffect } from 'react';
import { getGigs } from '../api/gig.api';
import GigCard from '../components/GigCard';

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      try {
        const data = await getGigs(search);
        setGigs(data);
      } catch (error) {
        console.error('Failed to fetch gigs:', error);
      }
      setLoading(false);
    };
    fetchGigs();
  }, [search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Find Your Next Gig</h1>
        <p className="text-gray-600">Browse through the latest opportunities posted on GigFlow.</p>
      </div>
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for gigs (e.g., 'React developer')"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : gigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No gigs found.</div>
      )}
    </div>
  );
};

export default GigList;
