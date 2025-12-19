import { useState } from 'react';
import { useTransacoes } from '../../hooks/useTransacoes';
import { useCategorias } from '../../hooks/useCategorias';
import { useUsuarios } from '../../hooks/useUsuarios';
import { TransacaoForm } from '../../components/Forms/TransacaoForm';
import { FinalidadeEnum } from '../../types';
import './Transacao.css';

const Transacao = () => {
  const { transacoes, loading, error, createTransacao, deleteTransacao } = useTransacoes();
  const { categorias } = useCategorias();
  const { usuarios } = useUsuarios();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, descricao: string) => {
    if (!confirm(`Tem certeza que deseja deletar a transação "${descricao}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteTransacao(id);
    setDeletingId(null);

    if (success) {
      alert('Transação deletada com sucesso!');
    }
  };

  const getTipoTransacao = (categoriaId: number): string => {
    const categoria = categorias.find(c => c.id === categoriaId);
    if (!categoria) return 'N/A';
    
    if (categoria.finalidade === FinalidadeEnum.Receita) return 'Entrada';
    if (categoria.finalidade === FinalidadeEnum.Despesa) return 'Saída';
    return 'Ambas';
  };

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const podeCreateTransacao = usuarios.length > 0 && categorias.length > 0;

  return (
    <div className="transacao-page">
      <div className="transacao-header">
        <h1 className="transacao-title">Transações</h1>
        <div className="transacao-actions">
          <button 
            className="transacao-btn"
            onClick={() => setShowForm(true)}
            disabled={!podeCreateTransacao}
            title={!podeCreateTransacao ? 'Cadastre pessoas e categorias primeiro' : ''}
          >
            + Nova Transação
          </button>
        </div>
      </div>

      {error && (
        <div style={{ 
          padding: 'var(--spacing-md)', 
          backgroundColor: '#fadbd8', 
          color: 'var(--error-color)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {error}
        </div>
      )}

      {!podeCreateTransacao && (
        <div style={{ 
          padding: 'var(--spacing-md)', 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Cadastre pessoas e categorias antes de criar transações
        </div>
      )}

      <div className="transacao-content">
        {loading && transacoes.length === 0 ? (
          <div className="transacao-loading">Carregando transações...</div>
        ) : transacoes.length === 0 ? (
          <div className="transacao-empty">
            <p>Nenhuma transação cadastrada ainda.</p>
            {podeCreateTransacao && (
              <button className="transacao-btn" onClick={() => setShowForm(true)}>
                Cadastrar primeira transação
              </button>
            )}
          </div>
        ) : (
          <div className="transacao-table-container">
            <table className="transacao-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Pessoa</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => {
                  const tipo = getTipoTransacao(transacao.categoriaId);
                  return (
                    <tr key={transacao.id}>
                      <td>{transacao.id}</td>
                      <td>{transacao.descricao}</td>
                      <td>{transacao.nomePessoa}</td>
                      <td>{transacao.nomeCategoria}</td>
                      <td>
                        <span className={`transacao-badge ${tipo === 'Entrada' ? 'entrada' : 'saida'}`}>
                          {tipo}
                        </span>
                      </td>
                      <td className="transacao-valor">{formatarValor(transacao.valor)}</td>
                      <td>
                        <button
                          className="transacao-delete-btn icon-delete"
                          onClick={() => handleDelete(transacao.id, transacao.descricao)}
                          disabled={deletingId === transacao.id}
                          title="Deletar transação"
                        >
                          {deletingId === transacao.id ? '...' : 'Excluir'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <TransacaoForm
          onClose={() => setShowForm(false)}
          onSubmit={createTransacao}
          categorias={categorias}
          usuarios={usuarios}
        />
      )}
    </div>
  );
};

export default Transacao;