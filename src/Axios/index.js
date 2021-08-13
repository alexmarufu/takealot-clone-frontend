import axios from "axios";
import store from "../store/store"

const token = localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default axiosIntance;