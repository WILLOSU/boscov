"use client";

import { useNavigate, useParams } from "react-router-dom";
import { AddFilmesContainer } from "./ManageFilmesStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  FilmeFormValues,
  FilmesData,
} from "../../components/Interface/Types";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import {
  createFilmes,
  getFilmesById,
  updateFilme,
} from "../../services/filmesServices";
import { useEffect, useState, useContext } from "react";
import { filmesSchema } from "../../schemas/filmesSchema";
import { UserContext } from "../../Context/UserContext";

export function ManageFilmes() {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user } = useContext(UserContext);

  const {
    register: registerFilmes,
    handleSubmit: handleRegisterFilmes,
    formState: { errors: errosRegisterFilmes },
    setValue,
    reset,
  } = useForm<FilmeFormValues>({
    resolver: zodResolver(filmesSchema),
    defaultValues: {
      usuarioCriador: user?.id ? String(user.id) : "2", // Convertendo para string
      status: "1", // Ativo por padrão
    },
  });

  useEffect(() => {
    async function fetchFilmeData() {
      if (action === "edit" && id) {
        try {
          setLoading(true);
          setErrorMessage(null);
          const filme = await getFilmesById(id);

          setValue("nome", filme.nome);
          setValue("poster", filme.poster);
          setValue("sinopse", filme.sinopse);
          setValue("diretor", filme.diretor);
          setValue("anoLancamento", String(filme.anoLancamento));
          setValue("duracao", String(filme.duracao));
          setValue("produtora", filme.produtora);
          setValue("classificacao", String(filme.classificacao));
          setValue("generoId", String(filme.generoId));
          setValue("status", String(filme.status));

          // Se o filme tiver generoDescricao, define o valor
          if (filme.generoDescricao) {
            setValue("generoDescricao", filme.generoDescricao);
          }

          // Define o usuarioCriador se estiver presente no filme
          if (filme.usuarioCriador) {
            setValue("usuarioCriador", String(filme.usuarioCriador));
          }
        } catch (error) {
          console.error("Erro ao buscar dados do filme:", error);
          setErrorMessage(
            "Não foi possível carregar os dados do filme. Tente novamente mais tarde."
          );
        } finally {
          setLoading(false);
        }
      } else if (action === "add") {
        // Reset do formulário para valores padrão ao adicionar novo filme
        reset({
          nome: "",
          poster: "",
          sinopse: "",
          diretor: "",
          anoLancamento: "",
          duracao: "",
          produtora: "",
          classificacao: "",
          generoId: "",
          status: "1", // Ativo por padrão
          usuarioCriador: user?.id ? String(user.id) : "2", // Convertendo para string
        });
        setErrorMessage(null);
        setSuccessMessage(null);
      }
    }

    fetchFilmeData();
  }, [action, id, setValue, reset, user]);

  // Função para converter FilmeFormValues para FilmesData
  function convertToFilmesData(data: FilmeFormValues): FilmesData {
    // Converte explicitamente cada campo para garantir o tipo correto
    return {
      nome: data.nome,
      poster: data.poster, // Deve ser uma URL válida
      sinopse: data.sinopse,
      diretor: data.diretor,
      anoLancamento: Number(data.anoLancamento),
      duracao: Number(data.duracao),
      produtora: data.produtora,
      classificacao: data.classificacao, // Mantém como string
      generoId: Number(data.generoId),
      status: data.status === "1", // Converte para boolean (1 = true, 0 = false)
      usuarioCriador:
        user?.id ||
        (data.usuarioCriador ? Number(data.usuarioCriador) : undefined),
      generoDescricao: data.generoDescricao,
    };
  }

  // Tipagem correta para os handlers de submit
  const registerFilmesSubmit = async (data: FilmeFormValues) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const filmeDataToSend = convertToFilmesData(data);
      console.log("Enviando dados para criação:", filmeDataToSend);

      await createFilmes(filmeDataToSend);
      setSuccessMessage("Filme cadastrado com sucesso!");

      // Aguarda um breve momento para mostrar a mensagem de sucesso antes de navegar
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar filme:", error);
      setErrorMessage(
        "Erro ao cadastrar filme. Verifique os dados e tente novamente."
      );

      // Log detalhado para depuração
      if (error instanceof Error) {
        console.error("Detalhes do erro:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const editFilmesSubmit = async (data: FilmeFormValues) => {
    if (!id) return;

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const filmeDataToSend = convertToFilmesData(data);
      console.log("Enviando dados para atualização:", filmeDataToSend);

      await updateFilme(id, filmeDataToSend);
      setSuccessMessage("Filme atualizado com sucesso!");

      // Aguarda um breve momento para mostrar a mensagem de sucesso antes de navegar
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      setErrorMessage(
        "Erro ao atualizar filme. Verifique os dados e tente novamente."
      );

      // Log detalhado para depuração
      if (error instanceof Error) {
        console.error("Detalhes do erro:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddFilmesContainer>
      <h2>{action === "add" ? "Adicionar" : "Atualizar"} Filme</h2>

      {/* Mensagens de erro e sucesso */}
      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "15px" }}
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginBottom: "15px" }}
        >
          {successMessage}
        </div>
      )}

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
            placeholder="URL do Poster do Filme"
            name="poster"
            register={registerFilmes}
          />
          {errosRegisterFilmes.poster && (
            <ErrorSpan>{errosRegisterFilmes.poster.message}</ErrorSpan>
          )}

          <Input
            placeholder="Sinopse"
            name="sinopse"
            register={registerFilmes}
            isInput={false}
          />
          {errosRegisterFilmes.sinopse && (
            <ErrorSpan>{errosRegisterFilmes.sinopse.message}</ErrorSpan>
          )}

          <Input
            type="text"
            placeholder="Diretor"
            name="diretor"
            register={registerFilmes}
          />
          {errosRegisterFilmes.diretor && (
            <ErrorSpan>{errosRegisterFilmes.diretor?.message}</ErrorSpan>
          )}

          <Input
            type="number"
            placeholder="Ano de Lançamento"
            name="anoLancamento"
            register={registerFilmes}
          />
          {errosRegisterFilmes.anoLancamento && (
            <ErrorSpan>{errosRegisterFilmes.anoLancamento.message}</ErrorSpan>
          )}

          <Input
            type="number"
            placeholder="Duração (em minutos)"
            name="duracao"
            register={registerFilmes}
          />
          {errosRegisterFilmes.duracao && (
            <ErrorSpan>{errosRegisterFilmes.duracao.message}</ErrorSpan>
          )}

          <Input
            type="text"
            placeholder="Produtora"
            name="produtora"
            register={registerFilmes}
          />
          {errosRegisterFilmes.produtora && (
            <ErrorSpan>{errosRegisterFilmes.produtora.message}</ErrorSpan>
          )}

          <Input
            type="number"
            placeholder="Classificação Indicativa"
            name="classificacao"
            register={registerFilmes}
          />
          {errosRegisterFilmes.classificacao && (
            <ErrorSpan>{errosRegisterFilmes.classificacao.message}</ErrorSpan>
          )}

          <Input
            type="number"
            placeholder="ID do Gênero"
            name="generoId"
            register={registerFilmes}
          />
          {errosRegisterFilmes.generoId && (
            <ErrorSpan>{errosRegisterFilmes.generoId.message}</ErrorSpan>
          )}

          <Input
            type="number"
            placeholder="Status (1 = Ativo, 0 = Inativo)"
            name="status"
            register={registerFilmes}
          />
          {errosRegisterFilmes.status && (
            <ErrorSpan>{errosRegisterFilmes.status.message}</ErrorSpan>
          )}

          {action === "edit" && (
            <Input
              type="text"
              placeholder="Gênero (Descrição)"
              name="generoDescricao"
              register={registerFilmes}
              disabled
            />
          )}

          {/* Campo oculto para usuarioCriador */}
          <input type="hidden" {...registerFilmes("usuarioCriador")} />

          <Button type="submit" disabled={loading}>
            {loading
              ? "Processando..."
              : action === "add"
              ? "Adicionar"
              : "Atualizar"}
          </Button>
        </form>
      )}
    </AddFilmesContainer>
  );
}
