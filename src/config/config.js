import axios from "axios";

const API_BASE_URL = "http://localhost:8084";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept the request to pass token
api.interceptors.request.use(
  (config) => {
    const excludedPaths = ["/login", "/api/v1/password-service"];
    // Exclude passing token for login
    if (!excludedPaths.some(path => config.url.includes(path))) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  // This will pass the error to the function calling it
  (error) => {
    return Promise.reject(error);
  }
);
