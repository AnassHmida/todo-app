import axios from 'axios';
import { User } from '@/types/auth';
import { Platform } from 'react-native';



const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:3000/api/v1',
    ios: 'http://localhost:3000/api/v1',
    web: 'http://localhost:3000/api/v1',
    default: 'http://localhost:3000/api/v1'
});

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(request => {
    console.log('🚀 API Request:', {
        url: request.url,
        baseURL: request.baseURL,
        method: request.method,
        data: request.data,
        headers: request.headers
    });
    return request;
});


api.interceptors.response.use(
    response => {
        console.log('✅ API Response:', {
            status: response.status,
            data: response.data,
            url: response.config.url
        });
        return response;
    },
    error => {
        console.log('❌ API Error:', {
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export const AuthAPI = {
    async login(username: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post('/users/login', { username, password });
            return {
                user: {
                    id: response.data.user._id || response.data.user.id,
                    username: response.data.user.username
                },
                token: response.data.token
            };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    },

    async register(username: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post('/users/register', { username, password });
            return {
                user: {
                    id: response.data.user._id || response.data.user.id,
                    username: response.data.user.username
                },
                token: response.data.token
            };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    },

    async signup(username: string, password: string): Promise<{ user: User; token: string }> {
        const response = await api.post('/users/signup', { username, password });
        return response.data;
    },

    setAuthToken(token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    clearAuthToken() {
        delete api.defaults.headers.common['Authorization'];
    }
}; 