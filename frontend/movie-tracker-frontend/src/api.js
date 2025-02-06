import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // substitua com a URL da sua API
});

export default api;
