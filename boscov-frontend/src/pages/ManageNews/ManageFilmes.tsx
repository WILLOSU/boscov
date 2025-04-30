import { useNavigate, useParams } from "react-router-dom";
import { AddFilmesContainer } from "./ManageFilmesStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { filmesSchema } from "../../schemas/filmesSchema";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import { createFilmes } from "../../services/filmesServices";
import { FilmesData } from "../../components/Interface/Types";

export function ManageFilmes() {
  const { action } = useParams();
  const navigate = useNavigate();

  // CRIANDO O USERFORM, com tipagem para FilmesData
  const {
    register: registerFilmes,
    handleSubmit: handleRegisterFilmes,
    formState: { errors: errosRegisterFilmes },
  } = useForm<FilmesData>({ resolver: zodResolver(filmesSchema) });

  // Função para registrar filme, com 'data' tipado como FilmesData
  async function registerFilmesSubmit(data: FilmesData) {
    try {
      await createFilmes(data);  // Passa o 'data' diretamente para a função de criação
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  // Função de edição de filmes, com 'data' tipado como FilmesData
  async function editFilmesSubmit(data: FilmesData) {
    // Lógica de edição de filme, se necessário
    console.log(data);  // Para depuração ou implementação posterior
  }

  return (
    <AddFilmesContainer>
      <h2>{action === "add" ? "Adicionar" : "Atualizar"} Filmes</h2>
      <form
        onSubmit={handleRegisterFilmes(
          action === "add" ? registerFilmesSubmit : editFilmesSubmit
        )}
      >
        <Input
          type="text"
          placeholder="Nome do Filme"
          name="nome"  // Certifique-se de que o nome corresponde ao schema
          register={registerFilmes}
          value={action !== "add" ? "nome" : ""}  // Atualizando a lógica para editar
        />
        {errosRegisterFilmes.nome && (
          <ErrorSpan>{errosRegisterFilmes.nome.message}</ErrorSpan>
        )}

        <Input
          type="text"
          placeholder="Poster do Filme"
          name="poster"  // Certificando-se de que o nome corresponde ao schema
          register={registerFilmes}
          value={action !== "add" ? "poster" : ""}  // Atualizando a lógica para editar
        />

        <Input
          type="text"
          placeholder="Sinopse"
          name="sinopse"  // Certifique-se de que o nome corresponde ao schema
          register={registerFilmes}
          isInput={false}
          value={action !== "add" ? "sinopse" : ""}  // Atualizando a lógica para editar
        />
        {errosRegisterFilmes.sinopse && (
          <ErrorSpan>{errosRegisterFilmes.sinopse.message}</ErrorSpan>
        )}

        <Button type="submit">
          {action === "add" ? "Adicionar" : "Atualizar"}
        </Button>
      </form>
    </AddFilmesContainer>
  );
}