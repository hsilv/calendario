import axios from "axios";

console.log(import.meta.env.VITE_API_BASE_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10),
  headers: {
    "Content-Type": "application/json",
  },
});

export { API };
