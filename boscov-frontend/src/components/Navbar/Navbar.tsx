import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../Imagens/LogoBF.png";
import { Button, Nav, ImageLogo, InputSpace, ErrorSpan } from "./NavbarStyled";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Tipagem dos dados do formulário
interface SearchFormData {
  title: string;
}

const searchSchema = z.object({
  title: z
  .string()
  .nonempty({ message: "A pesquisa não pode ser vazia" })
  .refine(value => !/^\s*$/.test(value),{ 
    message: "A pesquisa não pode ter apenas espaços"}), // negando a regex, se tem espaço, ai nega
});

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
        <Button>Entrar</Button>
      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}{" "}
      {/* valida se é true ou false*/}
      <Outlet /> {/* rode as rotas da minha navbar*/}
    </>
  );
};

// e na navbar eu tenho duas rotas então rode as duas rotas Outlet
