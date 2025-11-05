import axios, { AxiosError, AxiosRequestConfig } from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: AxiosError) => void }> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (!error) {
      prom.resolve(null);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Abaikan error dari login atau refresh-token
    if (originalRequest?.url?.includes("/api/auth/login") || originalRequest?.url?.includes("/api/auth/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api.request(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/api/auth/refresh-token");
        if (refreshResponse.data.success) {
          processQueue(null);
          return api.request(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        console.error("Gagal refresh token, logout pengguna");
        try {
          await api.post("/api/auth/logout");
        } catch (logoutError) {
          console.error("Gagal logout:", logoutError);
        }

        if (typeof window !== "undefined") {
          window.location.href = "/login?error=SessionExpired";
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { api };
