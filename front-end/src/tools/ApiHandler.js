import axios from 'axios';

export const getData = (endpoint) => {
  axios.get(endpoint).then((res) => {
    return res.data;
  });
};

export const postData = (data, endpoint) => {
  axios.post(endpoint, data).then((res) => {
    return res.data;
  });
};
