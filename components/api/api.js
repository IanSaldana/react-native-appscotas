// components/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.71:8000/api/", // Cambia la URL según sea necesario
  timeout: 10000,
});

export default api;
