import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  // baseURL:"https://string-geo.adaptable.app"
  baseURL: "https://string-geo-backend-5wqk.onrender.com",
});

export default axiosInstance;
