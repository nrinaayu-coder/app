import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("twc_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getToken = () => localStorage.getItem("twc_token");
export const setToken = (t) => {
  if (t) localStorage.setItem("twc_token", t);
  else localStorage.removeItem("twc_token");
};

export const imgUrl = (p) => {
  if (!p) return "";
  if (p.startsWith("http") || p.startsWith("/images")) return p;
  return p; // "/api/files/..." works same-origin
};
