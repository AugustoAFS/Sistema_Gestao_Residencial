import React, { useState } from 'react';
import type { CreateUsuarioDto } from '../../types';
import './Forms.css';

interface UsuarioFormProps {
  onClose: () => void;
  onSubmit: (data: CreateUsuarioDto) => Promise<boolean>;
}


export const UsuarioForm: React.FC<UsuarioFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreateUsuarioDto>({
    nome: '',
    idade: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUsuarioDto, string>>>({});
  const [loading, setLoading] = useState(false);


  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateUsuarioDto, string>> = {};

    if (!formData.nome || formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres';
    } else if (formData.nome.length > 255) {
      newErrors.nome = 'Nome deve ter no máximo 255 caracteres';
    }

    if (!formData.idade || formData.idade < 1) {
      newErrors.idade = 'Idade deve ser maior que 0';
    } else if (formData.idade > 150) {
      newErrors.idade = 'Idade deve ser menor que 150';
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
          <h2 className="form-modal-title">Nova Pessoa</h2>
          <button className="form-modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label required">Nome</label>
            <input
              type="text"
              className={`form-input ${errors.nome ? 'error' : ''}`}
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Digite o nome"
              disabled={loading}
            />
            {errors.nome && <span className="form-error">{errors.nome}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">Idade</label>
            <input
              type="number"
              className={`form-input ${errors.idade ? 'error' : ''}`}
              value={formData.idade || ''}
              onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })}
              placeholder="Digite a idade"
              min="1"
              max="150"
              disabled={loading}
            />
            {errors.idade && <span className="form-error">{errors.idade}</span>}
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
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
