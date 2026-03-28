import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/ai`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// ── Request Interceptor — attach Bearer token ───────────────────────

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response Interceptor — refresh token on 401 ─────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh for 401 errors on requests that haven't been retried yet
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the refresh endpoint (uses httpOnly cookie)
        const refreshRes = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = refreshRes.data.data;

        // Update the store with the new token and user
        const store = useAuthStore.getState();
        store.setToken(accessToken);
        if (user) {
          useAuthStore.setState({ user });
        }

        // Retry all queued requests with the new token
        processQueue(null, accessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear everything and force logout
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For non-401 errors, format and reject as before
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      const statusCode = error.response?.status || 500;

      return Promise.reject({
        success: false,
        error: message,
        statusCode,
      });
    }
    return Promise.reject(error);
  }
);



/**
 * Helper to attempt a token refresh and return the new access token.
 * Returns null if refresh fails.
 */
async function tryRefreshToken(): Promise<string | null> {
  try {
    const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!refreshRes.ok) return null;

    const json = await refreshRes.json();
    const { accessToken, user } = json.data;

    const store = useAuthStore.getState();
    store.setToken(accessToken);
    if (user) {
      useAuthStore.setState({ user });
    }

    return accessToken;
  } catch {
    return null;
  }
}

export async function fetchSSE(
  endpoint: string,
  body: Record<string, unknown>,
  onChunk: (data: { content?: string; done?: boolean }) => void,
  signal?: AbortSignal
): Promise<void> {
  async function doFetch(token: string | null): Promise<Response> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}/api/ai${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal,
      credentials: "include",
    });
  }

  let token = useAuthStore.getState().accessToken;
  let response = await doFetch(token);

  // If 401, attempt token refresh and retry once
  if (response.status === 401) {
    const newToken = await tryRefreshToken();
    if (newToken) {
      token = newToken;
      response = await doFetch(token);
    } else {
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as { error?: string }).error || `Request failed with status ${response.status}`
    );
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data: ")) {
        try {
          const data = JSON.parse(trimmed.slice(6));
          onChunk(data);
        } catch {
  
        }
      }
    }
  }
}

export default apiClient;
