import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

export const getData = async (endpoint) => {
  const res = await axios.get(endpoint, {
    headers: headers
  });
  return res.data;
};

export const postData = async (endpoint, data) => {
  const res = await axios.post(endpoint, data, { ...headers });
  return res.data;
};
