import axios from "axios";
const getToken = () => {
  return localStorage.getItem("authToken") || "";
};
const api = axios.create({
  baseURL: "/api",
});

const TokenApi = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export { api, TokenApi };
