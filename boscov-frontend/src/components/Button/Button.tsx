import { ReactNode } from "react";
import { ButtonHTMLAttributes } from "react";
import { ButtonSpace,  } from "./ButtonSytled";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;  
  variant?: "default" | "signin" | "signup"; // <- AQUI
}

export function Button({
  type = "button",
  onClick,
  children,
  variant = "default",
}: ButtonProps) {
  return (
    <ButtonSpace type={type} onClick={onClick} $variant={variant}>
      {children}
    </ButtonSpace>
  );
}
