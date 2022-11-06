import axios from 'axios';

const serverFetch = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS + '/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default serverFetch;
