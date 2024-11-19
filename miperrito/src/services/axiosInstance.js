import axios from 'axios';

const iAX = axios.create({
  baseURL: 'http://localhost:5000', // Base URL del backend
});

export default iAX;
