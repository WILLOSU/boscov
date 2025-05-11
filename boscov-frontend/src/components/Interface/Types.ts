import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import type { UseFormRegister, FieldValues } from "react-hook-form"

// Interface para componentes de Input/Textarea
export type InputProps<T extends FieldValues> = {
  type?: string
  placeholder?: string
  name: keyof T & string
  register: UseFormRegister<T>
  isInput?: boolean
  value?: string | number
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>

// Tipos para o formulário
export interface FilmeFormValues {
  nome: string
  poster: string
  sinopse: string
  diretor: string
  anoLancamento: string
  duracao: string
  produtora: string
  classificacao: string
  generos?: number[] | null | undefined
  status: string
  usuarioCriador?: string
  generoDescricao?: string
}

// Tipos para a API
export interface FilmesData {
  nome: string
  poster: string
  sinopse: string
  diretor: string
  anoLancamento: number
  duracao: number
  produtora: string
  classificacao: string
  generos: number[] // Array de IDs de gênero para a API
  status: boolean
  usuarioCriador?: number
  genero_filme?: { genero: { id?: number; descricao: string } }[]
}

// Interface para o objeto de gênero retornado do backend
export interface Genero {
  id: number
  descricao: string
}

export interface FilmeDataFromBackend {
  id: number
  nome: string
  poster?: string | null
  sinopse?: string | null
  diretor: string
  anoLancamento: number
  duracao: number
  produtora: string
  classificacao: string
  status: boolean
  usuarioCriador?: number | null
  genero_filme?: {
    idFilmeGenero: number
    idFilme: number
    idGenero: number
    genero: Genero
  }[]
}

// Interface para payload de avaliação (atualizada para incluir nota)
export interface AvaliacaoPayload {
  comentario?: string
  nota?: number
}

// Interface para comentários no frontend
export interface ComentarioFrontend {
  id: number
  filmeId: number
  usuarioId: number
  comentario: string
  dataCriacao: string
  dataAtualizacao: string
  usuario?: {
    id: number
    nome: string
    email: string
    avatar?: string
  }
  filme?: {
    id: number
    titulo: string
    poster?: string
  }
}

// Tipos existentes...

// Tipo para Avaliação no Frontend
export interface AvaliacaoFrontend {
  id: number;
  idFilme: number;
  idUsuario: number;
  nota: number;
  createdAt?: string;
  updatedAt?: string;
  usuarioNome?: string; // Nome do usuário que fez a avaliação (opcional)
}

// Expandir o tipo FilmeDetalhes para incluir avaliações
export interface FilmeDetalhes {
  // Campos existentes...
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  ano: number;
  duracao: string;
  genero: string;
  diretor: string;
  // Campos de avaliação
  mediaAvaliacoes?: number;
  totalAvaliacoes?: number;
  minhaAvaliacao?: number;
  avaliacoes?: AvaliacaoFrontend[];
}

export interface AvaliacaoFrontend {
  id: number
  filmeId: string
  usuarioId: number
  nota: number
  comentario: string
  //createdAt: string
  //updatedAt: string
}

export interface AvaliarFilmePayload {
  nota: number
  comentario: string
}