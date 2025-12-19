export const FinalidadeEnum = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

export type FinalidadeEnum = typeof FinalidadeEnum[keyof typeof FinalidadeEnum];

export interface Usuario {
  id: number;
  nome: string;
  idade: number;
  isMenorDeIdade?: boolean;
}

export interface CreateUsuarioDto {
  nome: string;
  idade: number;
}

export interface UpdateUsuarioDto {
  id: number;
  nome: string;
  idade: number;
}

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: FinalidadeEnum;
  finalidadeDescricao?: string;
  usuarioId: number;
  nomeUsuario?: string;
}

export interface CreateCategoriaDto {
  descricao: string;
  finalidade: FinalidadeEnum;
  usuarioId: number;
}

export interface UpdateCategoriaDto {
  id: number;
  descricao: string;
  finalidade: FinalidadeEnum;
  usuarioId: number;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  categoriaId: number;
  nomeCategoria?: string;
  pessoaId: number;
  nomePessoa?: string;
}

export interface CreateTransacaoDto {
  descricao: string;
  valor: number;
  categoriaId: number;
  pessoaId: number;
}

export interface UpdateTransacaoDto {
  id: number;
  descricao: string;
  valor: number;
  categoriaId: number;
  pessoaId: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
