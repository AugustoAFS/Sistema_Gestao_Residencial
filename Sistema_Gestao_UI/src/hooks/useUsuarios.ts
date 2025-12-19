import { useState, useEffect } from 'react';
import { usuarioService } from '../services';
import type { Usuario, CreateUsuarioDto } from '../types';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usuarioService.getAll();
      setUsuarios(data);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createUsuario = async (data: CreateUsuarioDto): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usuarioService.create(data);
      await fetchUsuarios();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao criar usuário';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usuarioService.delete(id);
      await fetchUsuarios();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao deletar usuário';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    deleteUsuario,
  };
};
