const BidCard = ({ bid, onHire, isOwner }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">From: <span className="font-semibold text-gray-700">{bid.freelancerId.name}</span></p>
        <p className="text-gray-600 my-2">{bid.message}</p>
        <p className="text-lg font-bold text-blue-600">${bid.price}</p>
      </div>
      <div className="text-right">
        {isOwner && bid.status === 'pending' && (
          <button onClick={() => onHire(bid._id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
            Hire Freelancer
          </button>
        )}
        {bid.status !== 'pending' && (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${bid.status === 'hired' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
          </span>
        )}
      </div>
    </div>
  );
};

export default BidCard;
