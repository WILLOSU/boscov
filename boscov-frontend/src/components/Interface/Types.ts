import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { UseFormRegister, FieldValues } from "react-hook-form";

// Interface para componentes de Input/Textarea
export type InputProps<T extends FieldValues> = {
  type?: string;
  placeholder?: string;
  name: keyof T & string;
  register: UseFormRegister<T>;
  isInput?: boolean;
  value?: string | number;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

// Tipos para o formulário
export interface FilmeFormValues {
  nome: string;
  poster: string;
  sinopse: string;
  diretor: string;
  anoLancamento: string;
  duracao: string;
  produtora: string;
  classificacao: string;
  generos?: number[] | null | undefined; // <--- ALTERAÇÃO IMPORTANTE
  status: string;
  usuarioCriador?: string;
  generoDescricao?: string;
}

// Tipos para a API
export interface FilmesData {
  nome: string;
  poster: string;
  sinopse: string;
  diretor: string;
  anoLancamento: number;
  duracao: number;
  produtora: string;
  classificacao: string;
  generos: number[]; // Array de IDs de gênero para a API
  status: boolean;
  usuarioCriador?: number;
  generoDescricao?: string;
}

// Interface para o objeto de gênero retornado do backend
export interface Genero {
  id: number;
  descricao: string;
}

export interface FilmeDataFromBackend {
  id: number;
  nome: string;
  poster?: string | null;
  sinopse?: string | null;
  diretor: string;
  anoLancamento: number;
  duracao: number;
  produtora: string;
  classificacao: string;
  status: boolean;
  usuarioCriador?: number | null;
  genero_filme?: {
    idFilmeGenero: number;
    idFilme: number;
    idGenero: number;
    genero: Genero;
  }[];
  
}