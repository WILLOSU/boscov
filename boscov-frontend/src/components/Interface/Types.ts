
import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

export interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  name: keyof T & string; 
  register: UseFormRegister<T>;
  isInput?: boolean;
  value?: string | number;
}


export interface FilmesData {
  nome: string;
  poster: string;
  sinopse: string;
}