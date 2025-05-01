import { useNavigate, useParams } from "react-router-dom";
import { AddFilmesContainer } from "./ManageFilmesStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { filmesSchema } from "../../schemas/filmesSchema";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import { createFilmes, getFilmesById, updateFilme } from "../../services/filmesServices";
import { FilmesData } from "../../components/Interface/Types";
import { useEffect, useState } from "react";

export function ManageFilmes() {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  // CRIANDO O USERFORM, com tipagem para FilmesData
  const {
    register: registerFilmes,
    handleSubmit: handleRegisterFilmes,
    formState: { errors: errosRegisterFilmes },
    setValue
  } = useForm<FilmesData>({ resolver: zodResolver(filmesSchema) });

  // Função para buscar dados do filme quando estiver em modo de edição
  useEffect(() => {
    async function fetchFilmeData() {
      if (action === "edit" && id) {
        try {
          setLoading(true);
          const filme = await getFilmesById(id);
          
          // Quando os dados forem carregados, preencha o formulário
          setValue("nome", filme.nome);
          setValue("poster", filme.poster);
          setValue("sinopse", filme.sinopse);
        } catch (error) {
          console.error("Erro ao buscar dados do filme:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    fetchFilmeData();
  }, [action, id, setValue]);

  // Função para registrar filme, com 'data' tipado como FilmesData
  async function registerFilmesSubmit(data: FilmesData) {
    try {
      setLoading(true);
      await createFilmes(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Função de edição de filmes, com 'data' tipado como FilmesData
  async function editFilmesSubmit(data: FilmesData) {
    if (!id) return;
    
    try {
      setLoading(true);
      await updateFilme(id, data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AddFilmesContainer>
      <h2>{action === "add" ? "Adicionar" : "Atualizar"} Filmes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form
          onSubmit={handleRegisterFilmes(
            action === "add" ? registerFilmesSubmit : editFilmesSubmit
          )}
        >
          <Input
            type="text"
            placeholder="Nome do Filme"
            name="nome" 
            register={registerFilmes}
          />
          {errosRegisterFilmes.nome && (
            <ErrorSpan>{errosRegisterFilmes.nome.message}</ErrorSpan>
          )}

          <Input
            type="text"
            placeholder="Poster do Filme"
            name="poster"  
            register={registerFilmes}
          />

          <Input
            type="text"
            placeholder="Sinopse"
            name="sinopse" 
            register={registerFilmes}
            isInput={false}
          />
          {errosRegisterFilmes.sinopse && (
            <ErrorSpan>{errosRegisterFilmes.sinopse.message}</ErrorSpan>
          )}

          <Button type="submit" disabled={loading}>
            {action === "add" ? "Adicionar" : "Atualizar"}
          </Button>
        </form>
      )}
    </AddFilmesContainer>
  );
}