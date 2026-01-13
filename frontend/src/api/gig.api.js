import axios from 'axios';

const API_URL = 'https://gigflow-wfog.onrender.com/api/gigs';

const getGigs = async (search = '') => {
  const response = await axios.get(`${API_URL}?search=${search}`);
  return response.data;
};

const createGig = async (gigData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, gigData, config);
  return response.data;
};

const getMyGigs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/mygigs`, config);
  return response.data;
};

const getGigById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export { getGigs, createGig, getMyGigs, getGigById };
