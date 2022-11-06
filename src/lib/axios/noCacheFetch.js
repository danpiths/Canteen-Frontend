import axios from 'axios';

const noCacheFetch = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS + '/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

noCacheFetch.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

export default noCacheFetch;
