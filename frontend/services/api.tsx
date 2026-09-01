import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:3000/api';
class ApiClient {
  private client: AxiosInstance ;
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshed = await this.refreshToken();
            if (refreshed) {
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      await AsyncStorage.setItem('access_token', response.data.accessToken);
      return true;
    } catch (error) {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
      return false;
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }

  async uploadImage(uri: string, folder: string = 'books') {
    const formData = new FormData();
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('image', {
      uri,
      name: filename,
      type,
    } as any);
    formData.append('folder', folder);

    return this.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const api = new ApiClient();