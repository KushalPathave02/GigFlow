import axios from 'axios';

const API_URL = '/api/bids';

const placeBid = async (bidData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bidData, config);
  return response.data;
};

const getBidsForGig = async (gigId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${gigId}`, config);
  return response.data;
};

const hireBid = async (bidId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${API_URL}/${bidId}/hire`, {}, config);
  return response.data;
};

const getMyBids = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/mybids`, config);
  return response.data;
};

export { placeBid, getBidsForGig, hireBid, getMyBids };
