import { apiClient } from './api';
import type { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../types';

export const usuarioService = {
  getAll: async () => {
    const { data } = await apiClient.get<Usuario[]>('/Usuario');
    return data;
  },

  create: async (data: CreateUsuarioDto) => {
    await apiClient.post('/Usuario', data);
  },

  update: async (id: number, data: UpdateUsuarioDto) => {
    await apiClient.put(`/Usuario/${id}`, data);
  },

  delete: async (id: number) => {
    await apiClient.delete(`/Usuario/${id}`);
  },
};
