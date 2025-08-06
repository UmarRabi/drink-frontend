import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://drink-backend-kfef.onrender.com/api/v1/', // Change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});
