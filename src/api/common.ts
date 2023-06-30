import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const token = localStorage.getItem('authToken')

export default axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: token
  }
});
