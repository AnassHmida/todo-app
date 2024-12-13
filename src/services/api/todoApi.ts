import axios from 'axios';
import { Todo, TodoInput } from '@/types/todo';
import { Platform } from 'react-native';
import { useAuthStore } from '@/store/authStore';


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
    const token = useAuthStore.getState().token;
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});


api.interceptors.request.use(request => {
    console.log('🚀 TODO API Request:', {
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
        console.log('✅ TODO API Response:', {
            status: response.status,
            data: response.data,
            url: response.config.url
        });
        return response;
    },
    error => {
        console.log('❌ TODO API Error:', {
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export const TodoAPI = {
    getTodos: async (): Promise<Todo[]> => {
        const response = await api.get('/todos');
        return response.data.map((todo: any) => ({
            id: todo._id,
            title: todo.title,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }));
    },

    addTodo: async (todo: TodoInput): Promise<Todo> => {
        const response = await api.post('/todos', todo);
        const newTodo = response.data;
        return {
            id: newTodo._id,
            title: newTodo.title,
            completed: newTodo.completed,
            createdAt: newTodo.createdAt,
            updatedAt: newTodo.updatedAt
        };
    },

    updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
        const response = await api.put(`/todos/${id}`, updates);
        const todo = response.data;
        return {
            id: todo._id,
            title: todo.title,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        };
    },

    async deleteTodo(id: string): Promise<void> {
        await api.delete(`/todos/${id}`);
    }
}; 