import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  // baseURL:"https://api.stringgeo.com"
  baseURL: "https://string-backend.onrender.com",
});

export default axiosInstance;
