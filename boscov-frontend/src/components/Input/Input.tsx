import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { InputSpace } from "./InputStyled";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
}

export function Input<T extends FieldValues>({ type, placeholder, name, register, ...rest }: InputProps<T>) {
  return (
    <InputSpace
      type={type}
      placeholder={placeholder}
      {...register(name)}
      {...rest}
    />
  );
}
