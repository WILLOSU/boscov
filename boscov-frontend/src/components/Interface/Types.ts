import { InputHTMLAttributes, TextareaHTMLAttributes,  } from "react";
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

// Interface para dados de Filmes
export interface FilmesData {
  nome: string;
  poster: string;
  sinopse: string;
}