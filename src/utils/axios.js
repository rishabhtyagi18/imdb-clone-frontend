import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://imdb-clone-backend-1.onrender.com/api";

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 5 * 10000,
  headers: {
    Accept: "application/json",
    authorization: `Bearer`,
  },
});
