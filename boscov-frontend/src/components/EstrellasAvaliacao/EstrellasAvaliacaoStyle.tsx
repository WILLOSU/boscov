import styled from "styled-components";

export const EstrelasContainer = styled.div<{ tamanho: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.tamanho === "pequeno" ? "2px" : "5px")};
`;

export const Estrela = styled.span<{
  preenchida: boolean;
  tamanho: string;
  interativa: boolean;
}>`
  color: ${(props) => (props.preenchida ? "#FFD700" : "#e0e0e0")};
  font-size: ${(props) =>
    props.tamanho === "pequeno"
      ? "16px"
      : props.tamanho === "medio"
      ? "24px"
      : "32px"};
  cursor: ${(props) => (props.interativa ? "pointer" : "default")};

  &:hover {
    transform: ${(props) => (props.interativa ? "scale(1.2)" : "none")};
  }
`;

export const NotaValor = styled.span<{ tamanho: string }>`
  margin-left: 8px;
  font-weight: 500;
  font-size: ${(props) =>
    props.tamanho === "pequeno"
      ? "14px"
      : props.tamanho === "medio"
      ? "16px"
      : "18px"};
`;