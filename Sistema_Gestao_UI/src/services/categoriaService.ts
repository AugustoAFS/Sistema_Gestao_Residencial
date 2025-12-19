import { apiClient } from './api';
import type { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../types';

export const categoriaService = {
  getAll: async () => {
    const { data } = await apiClient.get<Categoria[]>('/Categoria');
    return data;
  },

  create: async (data: CreateCategoriaDto) => {
    await apiClient.post('/Categoria', data);
  },

  update: async (id: number, data: UpdateCategoriaDto) => {
    await apiClient.put(`/Categoria/${id}`, data);
  },

  delete: async (id: number) => {
    await apiClient.delete(`/Categoria/${id}`);
  },
};
