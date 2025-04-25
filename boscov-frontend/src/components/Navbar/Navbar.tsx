import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../Imagens/LogoBF.png";
import { Nav, ImageLogo, InputSpace, ErrorSpan, UserLoggedSpace } from "./NavbarStyled";
import { userLogged } from "../../services/usuariosServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import searchSchema from "../../schemas/SearchSchema";
import Cookies from "js-cookie";

// Tipagem dos dados do formulário
interface SearchFormData {
  title: string;
}

interface UserData {
  id: number;
  nome: string;
  email: string;
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
  const [user, setUser] = useState<UserData | null>(null);

  // Função chamada ao enviar o formulário
  const onSearch: SubmitHandler<SearchFormData> = ({ title }) => {
    navigate(`/search/${title}`); // mudei de rota aqui
    reset(); // limpa o campo após pesquisa
  };

  function signout() {

  }

  async function findUserLogged(): Promise<void> {
    try {
      const response: AxiosResponse<UserData> = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, []);

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
        {user ? (
          <UserLoggedSpace>
            <h2>{user?.nome}</h2>
            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <Link to="/auth">
            <Button type="button">
              Entrar
            </Button>
          </Link>
        )}
      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}{" "}
      {/* valida se é true ou false*/}
      <Outlet /> {/* rode as rotas da minha navbar*/}
    </>
  );
};

// e na navbar eu tenho duas rotas então rode as duas rotas Outlet