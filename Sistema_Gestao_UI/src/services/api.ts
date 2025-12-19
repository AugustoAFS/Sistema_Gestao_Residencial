import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types';

const API_BASE_URL = 'http://localhost:5186/api';


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 segundos
});

/**
 * Interceptor de requisição
 * Aqui você pode adicionar tokens de autenticação, logs, etc.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Exemplo: adicionar token de autenticação
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError<ApiError>) => {
    console.error('[API Response Error]', error);

    // Trata erros específicos
    if (error.response) {
      // Servidor respondeu com erro (4xx, 5xx)
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Erro de validação:', data);
          break;
        case 404:
          console.error('Recurso não encontrado');
          break;
        case 500:
          console.error('Erro interno do servidor');
          break;
        default:
          console.error(`Erro ${status}:`, data);
      }
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor. Verifique sua conexão.');
    } else {
      // Erro ao configurar a requisição
      console.error('Erro ao fazer requisição:', error.message);
    }

    return Promise.reject(error);
  }
);
