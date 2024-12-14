import axios from 'axios';
import {ApiClient} from './apiClient';
import {User} from '@/types/auth';

const api = ApiClient.getInstance().getAxiosInstance();

export const AuthAPI = {
  async login(username: string, password: string): Promise<{user: User; token: string}> {
    try {
      const response = await api.post('/users/login', {username, password});
      return {
        user: {
          id: response.data.user._id || response.data.user.id,
          username: response.data.user.username,
        },
        token: response.data.token,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  async register(username: string, password: string): Promise<{user: User; token: string}> {
    try {
      const response = await api.post('/users/register', {username, password});
      return {
        user: {
          id: response.data.user._id || response.data.user.id,
          username: response.data.user.username,
        },
        token: response.data.token,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  setAuthToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clearAuthToken() {
    delete api.defaults.headers.common.Authorization;
  },
};
