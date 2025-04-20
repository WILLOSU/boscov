import styled from "styled-components";



export const HomeBody = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // duas colunas de 1 fração cada uma 
  grid-gap: 10px;
  margin: 1rem auto;
  width: 90%;
  max-width: 1200px;
  padding: 1rem;
`;

export const HomeHeader = styled.section`
  display: block;
  margin: 1rem auto;
  width: 90%;
  max-width: 1200px;
  padding: 1rem;

  & > div {
    width: 100%;
  }
`;
