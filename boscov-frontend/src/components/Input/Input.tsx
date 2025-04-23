import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { InputSpace } from "./InputStyled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>; 
}

export function Input({ type, placeholder, name, register, ...rest }: InputProps) {
  return (
    <InputSpace
      type={type}
      placeholder={placeholder}
      {...register(name)}
      {...rest}
    />
  );
}
