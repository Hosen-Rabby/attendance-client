import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://attendance-server-gamma.vercel.app/",
});

export default axiosInstance;
