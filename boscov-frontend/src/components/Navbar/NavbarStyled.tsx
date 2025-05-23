import styled from "styled-components";

// NavBar

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 1rem;
  /*position: fixed;
    top: 0;*/
  background-color: #005954;
  z-index: 1;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

// Logo

export const ImageLogo = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  background-color: #005954;
  box-shadow: 4px 4px 10px #004240, -4px -4px 10px #007e6e;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);  // Efeito de aumento
    box-shadow: 6px 6px 15px #004240, -6px -6px 15px #007e6e;  // Efeito de sombra ao passar o mouse
  }
`;

// Input

export const InputSpace = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;
  border: 1px solid #005954;
  transition: border 0.3s ease, transform 0.3s ease;

  // Pai - Input
  // i icone
  button {
    position: absolute;
    top: 1;
    right: 0.2rem;
    z-index: 10;
    border: none;
    background-color: #f5f5f5;
    color: #005954;
    border-radius: 0.3rem;
    padding: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;

    // Estado de hover para o ícone
    &:hover {
      background-color: #757575;
      color: #f5f5f5;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0,.25) ;
    }
  }
  // filho
  input {
    outline: none;
    font-size: 0,5rem;
    padding: 0.8rem;
    background-color: #f5f5f5;
    border: none;
    width: 100%;
    border-radius: 0.3rem;
    
    // Neto
    &:focus {
      border: 2px solid #2f2c79;
    }
  }

  &:hover {
    transform: scale(1.02); // Efeito de leve aumento no container do input
    border: 1px solid #2f2c79; // Mudança na borda ao passar o mouse
  }
`;



export const ErrorSpan = styled.span`
  background-color: #ffcdcd;
  color: #9e0000;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 7px;
`;

export const UserLoggedSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  gap: 1rem;

  h2 {
    font-size: 1.1rem;
    color: #f5f5f5;
    transition: all 0.3s;
    cursor: pointer;
  }

  h2:hover {
    color: #757575;
  }

  i {
    font-size: 1.5rem;
    color: #f5f5f5;
    cursor: pointer;
  }

  i:hover {
    color: #757575;
  }
`;