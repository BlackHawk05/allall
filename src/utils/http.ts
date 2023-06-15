import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthService } from '~/services/auth';
import { IRefreshToken, ITokensResponse } from '~/services/auth/interfaces';

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

let accessToken = localStorage.getItem('accessToken');
let refreshRetry = false;

const headers: Readonly<Record<string, string | boolean>> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

const injectToken = (config: AxiosRequestConfig): any => {
    accessToken = localStorage.getItem('accessToken');
    
    try {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    } catch (error) {
        throw new Error(error);
    }
};

class Http {
    private instance: AxiosInstance | null = null;
    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    async refreshAccessToken() {
        try {
            localStorage.removeItem('accessToken');
            accessToken = null;

            const data = {
                refresh_token: localStorage.getItem('refreshToken')
            }
            const response = await http.post<
                IRefreshToken, 
                ITokensResponse
            >(
                '/supplier-profile/authentication/refresh', 
                data
            );            
            accessToken = response.token;
            AuthService.setTokens(response);
        } catch (err) {
        }
    }

    initHttp() {
        const http = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
            headers,
            //withCredentials: true,
        });

        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

        http.interceptors.response.use(
            (response) => { return {...response.data} },
            (error) => {
                console.log('httpError:', refreshRetry, error);
                const originalRequest = error.config;

                if (error.response.status === StatusCode.Unauthorized) {

                    if (!refreshRetry && accessToken) {
                        originalRequest._retry = true;
                        refreshRetry = true;

                        return this.refreshAccessToken().then(() => {
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            refreshRetry = false;
                            console.log('httpRetry:', originalRequest);
                            
                            return http(originalRequest);
                        });
                    } else if (refreshRetry) {
                        AuthService.clearTokens();
                        accessToken = null;
                        window.location.reload();
                    }
                }else if (error.response.status === StatusCode.TooManyRequests) {
                    return Promise.reject(error && {
                        ...error,
                        message: 'Попробуйте позже',
                        errors: error.response?.data?.errors,
                    });
                }

                return Promise.reject(error && {
                    ...error,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors,
                });
            }
        );

        this.instance = http;
        return http;
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }
}

export const http = new Http();