/*  crio um styled components ou crio um component de input?
    melhor criar para sinin e signup um componente de inupu
    no caso tenho um código ts que é importante padronizar
    para facilitar.

///////

    Quando criar um style components?
    a diferença for apenas layout.

*/




import styled from "styled-components";

export const InputSpace = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 1px solid #757575;
`;

export const TextareaSpace = styled.textarea`
  padding: 1rem;
  border-radius: 7px;
  border: 1px solid #757575;
  width: 100%;
  height: 200px;
  resize: none;
`;
