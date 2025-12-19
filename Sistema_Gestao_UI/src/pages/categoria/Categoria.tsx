import { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import { useUsuarios } from '../../hooks/useUsuarios';
import { CategoriaForm } from '../../components/Forms/CategoriaForm';
import './Categoria.css';

const Categoria = () => {
  const { categorias, loading, error, createCategoria, deleteCategoria } = useCategorias();
  const { usuarios } = useUsuarios();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);


  const handleDelete = async (id: number, descricao: string) => {
    if (!confirm(`Tem certeza que deseja deletar a categoria "${descricao}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteCategoria(id);
    setDeletingId(null);

    if (success) {
      alert('Categoria deletada com sucesso!');
    }
  };

  /**
   * Retorna a cor baseada na finalidade
   */
  const getFinalidadeColor = (finalidade: string) => {
    if (finalidade?.toLowerCase().includes('despesa')) return '#e74c3c';
    if (finalidade?.toLowerCase().includes('receita')) return '#27ae60';
    return '#3498db';
  };

  return (
    <div className="categoria-page">
      <div className="categoria-header">
        <h1 className="categoria-title">Categorias</h1>
        <button 
          className="categoria-btn" 
          onClick={() => setShowForm(true)}
          disabled={usuarios.length === 0}
          title={usuarios.length === 0 ? 'Cadastre um usuário primeiro' : ''}
        >
          + Nova Categoria
        </button>
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

      {usuarios.length === 0 && (
        <div style={{ 
          padding: 'var(--spacing-md)', 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          Cadastre um usuário antes de criar categorias
        </div>
      )}

      <div className="categoria-content">
        {loading && categorias.length === 0 ? (
          <div className="categoria-loading">Carregando categorias...</div>
        ) : categorias.length === 0 ? (
          <div className="categoria-empty">
            <p>Nenhuma categoria cadastrada ainda.</p>
            {usuarios.length > 0 && (
              <button className="categoria-btn" onClick={() => setShowForm(true)}>
                Cadastrar primeira categoria
              </button>
            )}
          </div>
        ) : (
          <ul className="categoria-list">
            {categorias.map((categoria) => (
              <li key={categoria.id} className="categoria-item">
                <div className="categoria-item-content">
                  <div className="categoria-item-info">
                    <strong>{categoria.descricao}</strong>
                    <span 
                      className="categoria-badge"
                      style={{ backgroundColor: getFinalidadeColor(categoria.finalidadeDescricao || '') }}
                    >
                      {categoria.finalidadeDescricao}
                    </span>
                    <span className="categoria-user">por {categoria.nomeUsuario}</span>
                  </div>
                  <button
                    className="categoria-delete icon-delete"
                    onClick={() => handleDelete(categoria.id, categoria.descricao)}
                    disabled={deletingId === categoria.id}
                    title="Deletar categoria"
                  >
                    {deletingId === categoria.id ? '...' : 'Excluir'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <CategoriaForm
          onClose={() => setShowForm(false)}
          onSubmit={createCategoria}
          usuarios={usuarios}
        />
      )}
    </div>
  );
};

export default Categoria;