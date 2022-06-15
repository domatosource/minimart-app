import axios from 'axios';

export default axios.create({
  baseURL: process.env.baseAPI || `http://localhost:3001/api/v1`
});