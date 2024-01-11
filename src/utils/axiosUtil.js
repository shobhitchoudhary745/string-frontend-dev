import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL:"https://string-geo.adaptable.app"
});

export default axiosInstance;