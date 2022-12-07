import axios from 'axios';

export const getData = (endpoint) => {
  axios.get(endpoint).then((res) => {
    return res.data;
  });
};

export const postData = async (endpoint, data) => {
  const res = await axios.post(endpoint, data, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
  return res.data;
};
