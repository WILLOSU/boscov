import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../Imagens/LogoBF.png";
import { Nav, ImageLogo, InputSpace, ErrorSpan } from "./NavbarStyled";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import searchSchema from "../../schemas/SearchSchema";

// Tipagem dos dados do formulário
interface SearchFormData {
  title: string;
}


export const Navbar: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const onSearch: SubmitHandler<SearchFormData> = ({ title }) => {
    navigate(`/search/${title}`); // mudei de rota aqui
    reset(); // limpa o campo após pesquisa
  };

  function goAuth(){
    navigate('/auth');
  }

  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSearch)}>
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
        </form>
        <Link to="/">
          {" "}
          {/* retorna para home, navegação interna*/}
          <ImageLogo src={logo} alt="Logo do Boscov Filmes" />
        </Link>
        <Button onClick={goAuth}>Entrar</Button>

      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}{" "}
      {/* valida se é true ou false*/}
      <Outlet /> {/* rode as rotas da minha navbar*/}
    </>
  );
};

// e na navbar eu tenho duas rotas então rode as duas rotas Outlet
