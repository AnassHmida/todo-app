import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor(config?: AxiosRequestConfig) {
    const BASE_URL = Platform.select({
      android: 'http://10.0.2.2:3000/api/v1',
      ios: 'http://localhost:3000/api/v1',
      web: 'http://localhost:3000/api/v1',
      default: 'http://localhost:3000/api/v1',
    });

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    this.setupInterceptors();
  }

  public static getInstance(config?: AxiosRequestConfig): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(config);
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(request => {
      console.log('🚀 API Request:', {
        url: request.url,
        method: request.method,
        data: request.data,
      });
      return request;
    });

    this.axiosInstance.interceptors.response.use(
      response => {
        console.log('✅ API Response:', {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      error => {
        console.log('❌ API Error:', {
          status: error.response?.status,
          message: error.message,
        });
        return Promise.reject(error);
      },
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
