import styled from "styled-components";

export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
  padding: 2rem;
  background-color: #fff;
  box-shadow: rgba(50, 50, 105, 0.149) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 0.3rem;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardBody = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px; /* Adiciona espaço interno */
  gap: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  img {
    width: 120px;
    height: 180px;

    flex-shrink: 0;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.05);
  }
`;

export const CardFooter = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;

  div{
    display: flex;
    align-items: center; 
    gap: 1rem;
  }

  .bi-star-fill {
    color: #f8c53f;
    font-size: 1.5rem;
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      transform: scale(1.2);
      filter: brightness(1.2);
    }
  }

  .bi-chat-fill {
    color: #005954;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(-10deg) scale(1.2);
    }
  }
  
`;
// abaixo do poster
export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .detalhes {
    margin-top: 2.5rem; /* Aumenta o espaço entre a imagem e o texto */
    font-size: 14px;
    text-align: left;
  }
`;


