import { apiClient } from './api';
import type { Transacao, CreateTransacaoDto, UpdateTransacaoDto } from '../types';

export const transacaoService = {
  getAll: async () => {
    const { data } = await apiClient.get<Transacao[]>('/Transacao');
    return data;
  },

  create: async (data: CreateTransacaoDto) => {
    await apiClient.post('/Transacao', data);
  },

  update: async (id: number, data: UpdateTransacaoDto) => {
    await apiClient.put(`/Transacao/${id}`, data);
  },

  delete: async (id: number) => {
    await apiClient.delete(`/Transacao/${id}`);
  },
};
