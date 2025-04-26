import React, { useContext, useEffect, useCallback } from "react";
import { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../Imagens/LogoBF.png";
import {
  Nav,
  ImageLogo,
  InputSpace,
  ErrorSpan,
  UserLoggedSpace,
} from "./NavbarStyled";
import { userLogged } from "../../services/usuariosServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import searchSchema from "../../schemas/SearchSchema";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";

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
  const { user, setUser } = useContext(UserContext);

  // Função chamada ao enviar o formulário
  const onSearch: SubmitHandler<SearchFormData> = ({ title }) => {
    navigate(`/search/${title}`);
    reset();
  };

  const signout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  };

  const findUserLogged = useCallback(async (): Promise<void> => {
    try {
      const response: AxiosResponse = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [setUser]);

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, [findUserLogged]);

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
          <ImageLogo src={logo} alt="Logo do Boscov Filmes" />
        </Link>
        {user ? (
          <UserLoggedSpace>
            <Link to="/profile">
              <h2>{user.nome}</h2>
            </Link>
            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <Link to="/auth">
            <Button type="button">Entrar</Button>
          </Link>
        )}
      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
      <Outlet />
    </>
  );
};