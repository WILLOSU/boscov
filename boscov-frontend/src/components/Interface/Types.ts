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
  usuarioCriador?: string
  generoDescricao?: string
}

// Tipos para a API (após a transformação)
export interface FilmesData {
  nome: string
  poster: string
  sinopse: string
  diretor: string
  anoLancamento: number
  duracao: number
  produtora: string
  classificacao: string // Alterado para string conforme esperado pelo backend
  generoId: number
  status: boolean // Alterado para boolean conforme esperado pelo backend
  usuarioCriador?: number
  generoDescricao?: string
}
