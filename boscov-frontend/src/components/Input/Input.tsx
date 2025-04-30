import { InputSpace, TextareaSpace } from "./InputStyled";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type?: string;
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  isInput?: boolean;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input<T extends FieldValues>({
  type = "text",
  placeholder,
  name,
  register,
  isInput = true,
  value,
  ...rest
}: InputProps<T>) {
  if (isInput) {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      type,
      placeholder,
      ...register(name),
      ...rest,
    };
    if (value !== undefined) inputProps.value = value;

    return <InputSpace {...inputProps} />;
  } else {
    const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
      placeholder,
      ...register(name),
      ...rest,
    };
    if (value !== undefined) textareaProps.value = value;

    return <TextareaSpace {...textareaProps} />;
  }
}