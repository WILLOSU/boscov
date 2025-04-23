import { ReactNode } from "react";
import { ButtonSpace } from "./ButtonSytled";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
  variant?: "default" | "signin" | "signup"; // <- AQUI
}

export function Button({ type = "button", onClick, children, variant = "default" }: ButtonProps) {
  return (
    <ButtonSpace type={type} onClick={onClick} variant={variant}>
      {children}
    </ButtonSpace>
  );
}

