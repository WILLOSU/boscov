// src/components/Interface/Types.ts

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

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

// Tipos para o formulário (antes da transformação do Zod)
export interface FilmeFormValues {
  nome: string
  poster: string
  sinopse: string
  diretor: string
  anoLancamento: string // String no formulário
  duracao: string // String no formulário
  produtora: string
  classificacao: string // String no formulário
  generoId: string // String no formulário
  status: string // String no formulário
  usuarioCriador: number
  generoDescricao?: string
}

// Tipos para a API (após a transformação)
export interface FilmesData {
  nome: string
  poster: string
  sinopse: string
  diretor: string
  anoLancamento: number // Número para a API
  duracao: number // Número para a API
  produtora: string
  classificacao: number // Número para a API
  generoId: number // Número para a API
  status: number // Número para a API
  usuarioCriador: number
  generoDescricao?: string
}
