import React, { useState, useEffect } from 'react';
import type { CreateTransacaoDto, Categoria, Usuario } from '../../types';
import { FinalidadeEnum } from '../../types';
import './Forms.css';

interface TransacaoFormProps {
  onClose: () => void;
  onSubmit: (data: CreateTransacaoDto) => Promise<boolean>;
  categorias: Categoria[];
  usuarios: Usuario[];
}

export const TransacaoForm: React.FC<TransacaoFormProps> = ({ 
  onClose, 
  onSubmit, 
  categorias,
  usuarios 
}) => {
  const [formData, setFormData] = useState<CreateTransacaoDto>({
    descricao: '',
    valor: 0,
    categoriaId: 0,
    pessoaId: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTransacaoDto, string>>>({});
  const [loading, setLoading] = useState(false);
  const [categoriasFiltered, setCategoriasFiltered] = useState<Categoria[]>([]);

  useEffect(() => {
    if (usuarios.length > 0 && formData.pessoaId === 0) {
      setFormData(prev => ({ ...prev, pessoaId: usuarios[0].id }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarios]);

  useEffect(() => {
    const pessoaSelecionada = usuarios.find(u => u.id === formData.pessoaId);
    
    if (pessoaSelecionada?.isMenorDeIdade) {
      const filtered = categorias.filter(c => 
        c.finalidade === FinalidadeEnum.Despesa || 
        c.finalidade === FinalidadeEnum.Ambas
      );
      setCategoriasFiltered(filtered);
      
      if (formData.categoriaId !== 0 && !filtered.find(c => c.id === formData.categoriaId)) {
        setFormData(prev => ({ ...prev, categoriaId: filtered[0]?.id || 0 }));
      }
    } else {
      setCategoriasFiltered(categorias);
    }

    if (categorias.length > 0 && formData.categoriaId === 0) {
      setFormData(prev => ({ ...prev, categoriaId: categorias[0].id }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.pessoaId, categorias, usuarios]);


  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateTransacaoDto, string>> = {};

    if (!formData.descricao || formData.descricao.length < 3) {
      newErrors.descricao = 'Descrição deve ter no mínimo 3 caracteres';
    } else if (formData.descricao.length > 255) {
      newErrors.descricao = 'Descrição deve ter no máximo 255 caracteres';
    }

    if (!formData.valor || formData.valor < 0.01) {
      newErrors.valor = 'Valor deve ser maior que 0';
    }

    if (!formData.categoriaId || formData.categoriaId === 0) {
      newErrors.categoriaId = 'Selecione uma categoria';
    }

    if (!formData.pessoaId || formData.pessoaId === 0) {
      newErrors.pessoaId = 'Selecione uma pessoa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    const success = await onSubmit(formData);
    setLoading(false);

    if (success) {
      onClose();
    }
  };

  const pessoaSelecionada = usuarios.find(u => u.id === formData.pessoaId);

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-modal-header">
          <h2 className="form-modal-title">Nova Transação</h2>
          <button className="form-modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Pessoa</label>
            <select
              className={`form-select ${errors.pessoaId ? 'error' : ''}`}
              value={formData.pessoaId}
              onChange={(e) => setFormData({ ...formData, pessoaId: parseInt(e.target.value) })}
              disabled={loading || usuarios.length === 0}
            >
              {usuarios.length === 0 && <option value={0}>Nenhum usuário cadastrado</option>}
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome} {usuario.isMenorDeIdade && '(Menor de idade)'}
                </option>
              ))}
            </select>
            {errors.pessoaId && <span className="form-error">{errors.pessoaId}</span>}
            {pessoaSelecionada?.isMenorDeIdade && (
              <span className="form-error" style={{ color: 'var(--warning-color)' }}>
                ⚠️ Menores de idade só podem criar despesas
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label required">Descrição</label>
            <input
              type="text"
              className={`form-input ${errors.descricao ? 'error' : ''}`}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Digite a descrição"
              disabled={loading}
            />
            {errors.descricao && <span className="form-error">{errors.descricao}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              className={`form-input ${errors.valor ? 'error' : ''}`}
              value={formData.valor || ''}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              min="0.01"
              disabled={loading}
            />
            {errors.valor && <span className="form-error">{errors.valor}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">Categoria</label>
            <select
              className={`form-select ${errors.categoriaId ? 'error' : ''}`}
              value={formData.categoriaId}
              onChange={(e) => setFormData({ ...formData, categoriaId: parseInt(e.target.value) })}
              disabled={loading || categoriasFiltered.length === 0}
            >
              {categoriasFiltered.length === 0 && <option value={0}>Nenhuma categoria disponível</option>}
              {categoriasFiltered.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao} ({categoria.finalidadeDescricao})
                </option>
              ))}
            </select>
            {errors.categoriaId && <span className="form-error">{errors.categoriaId}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="form-btn form-btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="form-btn form-btn-primary"
              disabled={loading || usuarios.length === 0 || categoriasFiltered.length === 0}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
