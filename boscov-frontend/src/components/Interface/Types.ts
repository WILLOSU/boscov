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

// Interface para notas no frontend
export interface NotaFrontend {
  // Defina as propriedades da sua interface NotaFrontend aqui
  id: number;
  filmeId: number;
  usuarioId: number;
  nota: number;
  dataAvaliacao: string;
}

export interface EstatisticasAvaliacao {
  media: number;
  total: number;
  distribuicao: Record<number, number>;
}