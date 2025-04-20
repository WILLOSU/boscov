import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import logo from '../Imagens/LogoBF.png';
import { Button, Nav, ImageLogo, InputSpace } from "./NavbarStyled";

// Tipagem dos dados do formulário
interface SearchFormData {
  title: string;
}

export const Navbar: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<SearchFormData>();
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const onSearch: SubmitHandler<SearchFormData> = ({ title }) => {
    navigate(`/search/${title}`);
    reset(); // limpa o campo após pesquisa
  };

  return (
    <>
      <Nav onSubmit={handleSubmit(onSearch)}>
        <InputSpace>
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
          <input
            {...register("title")}
            type="text"
            placeholder="Pesquise por um Filme"
          />
        </InputSpace>

        <ImageLogo src={logo} alt="Logo do Boscov Filmes" />
        <Button>Entrar</Button>
      </Nav>
      <Outlet /> {/* rode as rotas da minha navbar*/}
    </>
  );
};

// e na navbar eu tenho duas rotas então rode as duas rotas Outlet