import { useState, useEffect } from 'react';
import { categoriaService } from '../services';
import type { Categoria, CreateCategoriaDto } from '../types';


export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategoria = async (data: CreateCategoriaDto): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await categoriaService.create(data);
      await fetchCategorias();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao criar categoria';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategoria = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await categoriaService.delete(id);
      await fetchCategorias();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao deletar categoria';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    fetchCategorias,
    createCategoria,
    deleteCategoria,
  };
};
