import React from "react";
import logo from '../Imagens/LogoBF.png'
import { Button, Nav, ImageLogo, InputSpace } from "./NavbarStyled";


export const Navbar: React.FC = () => {
  return (
    <>
      {" "}
      {/* Fragment */}
      <Nav>
        <InputSpace>
            <i className="bi bi-search"></i>
                <input type="text" placeholder="Pesquise por um Filme" />

            
        </InputSpace>

        <ImageLogo src={logo} alt="Logo do Boscov Filmes" />
        <Button>Entrar</Button>
      </Nav>
    </>
  );
};

