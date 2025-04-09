import React from "react";
import logo from '../Imagens/LogoBF.png'
import "./Navbar.css"

export const Navbar: React.FC = () => {
  return (
    <>
      {" "}
      {/* Fragment */}
      <nav>
        <div className="input-search-space">
            <i className="bi bi-search"></i>
                <input type="text" placeholder="Pesquise por um Filme" />

            
        </div>

        <img src={logo} alt="Logo do Boscov Filmes" />
        <button>Entrar</button>
      </nav>
    </>
  );
};
