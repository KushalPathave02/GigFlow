import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{gig.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{gig.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${gig.budget}</span>
          <Link to={`/gig/${gig._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
