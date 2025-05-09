import styled from "styled-components";

interface StarProps {
  $filled: boolean;
  $readOnly: boolean;
  $size: "small" | "medium" | "large";
}

interface StarContainerProps {
  $size: "small" | "medium" | "large";
}

export const StarContainer = styled.div<StarContainerProps>`
  display: flex;
  align-items: center;
  gap: ${(props) =>
    props.$size === "small" ? "2px" : props.$size === "medium" ? "4px" : "6px"};
`;

export const Star = styled.i<StarProps>`
  color: ${(props) => (props.$filled ? "#f8c53f" : "#ccc")};
  font-size: ${(props) =>
    props.$size === "small"
      ? "1rem"
      : props.$size === "medium"
      ? "1.5rem"
      : "2rem"};
  cursor: ${(props) => (props.$readOnly ? "default" : "pointer")};
  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: ${(props) => (props.$readOnly ? "none" : "scale(1.2)")};
  }
`;
