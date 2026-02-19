import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/refreshToken");
        return api(originalRequest);
      } catch {
        if (!window.__redirectingToLogin) {
          window.__redirectingToLogin = true;
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
