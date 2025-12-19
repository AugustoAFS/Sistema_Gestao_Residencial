import React, { useState, useEffect } from 'react';
import type { CreateCategoriaDto, Usuario } from '../../types';
import { FinalidadeEnum } from '../../types';
import './Forms.css';

interface CategoriaFormProps {
  onClose: () => void;
  onSubmit: (data: CreateCategoriaDto) => Promise<boolean>;
  usuarios: Usuario[];
}


export const CategoriaForm: React.FC<CategoriaFormProps> = ({ onClose, onSubmit, usuarios }) => {
  const [formData, setFormData] = useState<CreateCategoriaDto>({
    descricao: '',
    finalidade: FinalidadeEnum.Despesa,
    usuarioId: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateCategoriaDto, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuarios.length > 0 && formData.usuarioId === 0) {
      setFormData(prev => ({ ...prev, usuarioId: usuarios[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarios]);


  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateCategoriaDto, string>> = {};

    if (!formData.descricao || formData.descricao.length < 3) {
      newErrors.descricao = 'Descrição deve ter no mínimo 3 caracteres';
    } else if (formData.descricao.length > 255) {
      newErrors.descricao = 'Descrição deve ter no máximo 255 caracteres';
    }

    if (!formData.usuarioId || formData.usuarioId === 0) {
      newErrors.usuarioId = 'Selecione um usuário';
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

  return (
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-modal-header">
          <h2 className="form-modal-title">Nova Categoria</h2>
          <button className="form-modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label className="form-label required">Finalidade</label>
            <select
              className="form-select"
              value={formData.finalidade}
              onChange={(e) => setFormData({ ...formData, finalidade: parseInt(e.target.value) as FinalidadeEnum })}
              disabled={loading}
            >
              <option value={FinalidadeEnum.Despesa}>Despesa</option>
              <option value={FinalidadeEnum.Receita}>Receita</option>
              <option value={FinalidadeEnum.Ambas}>Ambas</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label required">Usuário</label>
            <select
              className={`form-select ${errors.usuarioId ? 'error' : ''}`}
              value={formData.usuarioId}
              onChange={(e) => setFormData({ ...formData, usuarioId: parseInt(e.target.value) })}
              disabled={loading || usuarios.length === 0}
            >
              {usuarios.length === 0 && <option value={0}>Nenhum usuário cadastrado</option>}
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
            {errors.usuarioId && <span className="form-error">{errors.usuarioId}</span>}
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
              disabled={loading || usuarios.length === 0}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
