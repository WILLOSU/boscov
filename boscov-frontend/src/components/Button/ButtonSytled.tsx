import styled, { css } from "styled-components";

interface ButtonSpaceProps {
  variant?: "default" | "signin" | "signup";
}

export const ButtonSpace = styled.button<ButtonSpaceProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.variant === "default" &&
    css`
      background-color: #e0e0e0;
      color: #000;
    `}

  ${(props) =>
    props.variant === "signin" &&
    css`
      background-color: #007e7e; /* cor 005954 um pouco mais clara */
      color: #fff;
    `}

  ${(props) =>
    props.variant === "signup" &&
    css`
      background-color: #005954;
      color: #fff;
    `}

    &:hover {
    background-color: #757575;
    color: #f5f5f5;
    transform: translateY(-5px); // Efeito de elevação
  }
`;
