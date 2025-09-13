import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // Change if needed
  // baseURL: 'https://drink-backend-kfef.onrender.com/api/v1/', // Change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});
