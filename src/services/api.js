import axios from "axios";
import DEV_URL from "../config/config";

const api = axios.create({
  baseURL: DEV_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


