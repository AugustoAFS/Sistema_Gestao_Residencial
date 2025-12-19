import { useState, useEffect } from 'react';
import { transacaoService } from '../services';
import type { Transacao, CreateTransacaoDto } from '../types';


export const useTransacoes = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchTransacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transacaoService.getAll();
      setTransacoes(data);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTransacao = async (data: CreateTransacaoDto): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await transacaoService.create(data);
      await fetchTransacoes();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao criar transação';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransacao = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await transacaoService.delete(id);
      await fetchTransacoes();
      return true;
    } catch (err: unknown) {
      const message = (err as {response?: {data?: {message?: string}}})?.response?.data?.message || 'Erro ao deletar transação';
      setError(message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);

  return {
    transacoes,
    loading,
    error,
    fetchTransacoes,
    createTransacao,
    deleteTransacao,
  };
};
