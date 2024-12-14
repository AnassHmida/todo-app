import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {API_URL, API_TIMEOUT} from '@env';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private static onUnauthorized?: () => void;

  public static setUnauthorizedCallback(callback: () => void) {
    ApiClient.onUnauthorized = callback;
  }

  private constructor(config?: AxiosRequestConfig) {
    const BASE_URL = API_URL;

    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: parseInt(API_TIMEOUT, 10),
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

        if (error.response?.status === 401 && ApiClient.onUnauthorized) {
          ApiClient.onUnauthorized();
        }

        return Promise.reject(error);
      },
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
