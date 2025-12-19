import { useState } from 'react';
import { useUsuarios } from '../../hooks';
import { UsuarioForm } from '../../components/Forms/UsuarioForm';
import './Pessoa.css';


const Pessoa = () => {
  const { usuarios, loading, error, createUsuario, deleteUsuario } = useUsuarios();
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);


  const handleDelete = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja deletar ${nome}?\n\nATENÇÃO: Todas as transações deste usuário serão deletadas!`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteUsuario(id);
    setDeletingId(null);

    if (success) {
      alert('Usuário deletado com sucesso!');
    }
  };

  return (
    <div className="pessoa-page">
      <div className="pessoa-header">
        <h1 className="pessoa-title">Pessoas</h1>
        <button className="pessoa-btn" onClick={() => setShowForm(true)}>
          + Nova Pessoa
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

      <div className="pessoa-content">
        {loading && usuarios.length === 0 ? (
          <div className="pessoa-loading">Carregando pessoas...</div>
        ) : usuarios.length === 0 ? (
          <div className="pessoa-empty">
            <p>Nenhuma pessoa cadastrada ainda.</p>
            <button className="pessoa-btn" onClick={() => setShowForm(true)}>
              Cadastrar primeira pessoa
            </button>
          </div>
        ) : (
          <div className="pessoa-grid">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="pessoa-card">
                <div className="pessoa-card-header">
                  <h3 className="pessoa-card-name">
                    {usuario.nome}
                    {usuario.isMenorDeIdade && (
                      <span className="pessoa-badge-menor"> Menor</span>
                    )}
                  </h3>
                  <button
                    className="pessoa-card-delete icon-delete"
                    onClick={() => handleDelete(usuario.id, usuario.nome)}
                    disabled={deletingId === usuario.id}
                    title="Deletar pessoa"
                  >
                    {deletingId === usuario.id ? '...' : 'Excluir'}
                  </button>
                </div>
                <p className="pessoa-card-info">
                  <strong>Idade:</strong> {usuario.idade} anos
                </p>
                <p className="pessoa-card-info">
                  <strong>ID:</strong> {usuario.id}
                </p>
                {usuario.isMenorDeIdade && (
                  <p className="pessoa-card-warning">
                    Pode criar apenas despesas
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <UsuarioForm
          onClose={() => setShowForm(false)}
          onSubmit={createUsuario}
        />
      )}
    </div>
  );
};

export default Pessoa;   