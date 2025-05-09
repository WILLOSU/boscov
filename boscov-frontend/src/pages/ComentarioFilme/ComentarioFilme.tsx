"use client";

import { type JSX, useContext, useState, useEffect } from "react";
import { AddComentContainer } from "./ComentarioFilmeStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  comentarioSchema,
  type ComentarioFormValues,
} from "../../schemas/comentarioSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../Context/UserContext";
import {
  adicionarComentario,
  editarComentario,
  getComentario,
} from "../../services/comentariosServices";
import axios from "axios";
import type { ComentarioFrontend } from "../../components/Interface/Types";

export function ComentarioFilme(): JSX.Element {
  const { id: filmeIdParam } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [action, setAction] = useState<"adicionar" | "atualizar">("adicionar");
  const [existingCommentData, setExistingCommentData] =
    useState<ComentarioFrontend | null>(null);
  const filmeId = filmeIdParam ? Number.parseInt(filmeIdParam, 10) : null;

  const {
    register: registerComment,
    handleSubmit: handleRegisterComment,
    formState: { errors: errosRegisterComment },
    reset,
    setValue,
  } = useForm<ComentarioFormValues>({
    resolver: zodResolver(comentarioSchema),
  });

  // Definindo a função fetchExistingComment dentro do useEffect para evitar o erro de dependência
  useEffect(() => {
    const fetchExistingComment = async () => {
      if (filmeId && user?.id) {
        setLoading(true);
        setErrorMessage(null);
        try {
          const existingComment = await getComentario(filmeId, user.id);
          setExistingCommentData(existingComment);
          if (existingComment?.comentario) {
            setAction("atualizar");
            setValue("comentario", existingComment.comentario);
          } else {
            setAction("adicionar");
            reset();
          }
        } catch (error) {
          console.error("Erro ao carregar comentário existente:", error);
          // Se não encontrar comentário, não mostra erro - é comportamento normal
          if (axios.isAxiosError(error) && error.response?.status !== 404) {
            setErrorMessage("Erro ao carregar seu comentário anterior.");
          }
          setAction("adicionar");
          reset();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExistingComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmeId, user?.id]);

  async function registerCommentSubmit(data: ComentarioFormValues) {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!filmeId) {
        setErrorMessage("ID do filme não encontrado.");
        return;
      }

      console.log("Enviando comentário para o filme:", filmeId);

      // Verifique se data.comentario está definido antes de passar
      if (data.comentario) {
        const novoComentario = await adicionarComentario(
          filmeId,
          data.comentario
        );
        console.log("Comentário criado:", novoComentario);
        setSuccessMessage("Comentário adicionado com sucesso!");
        
        // Aguarda um curto período para que o usuário veja a mensagem de sucesso
        setTimeout(() => {
          // Navega para a página de perfil
          navigate("/profile", { replace: true });
        }, 1500);
      } else {
        setErrorMessage("Por favor, digite um comentário.");
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      if (axios.isAxiosError(error)) {
        // Extrair mensagem de erro específica da API se disponível
        setErrorMessage(error.response?.data?.message || "Erro ao adicionar comentário. Tente novamente.");
      } else {
        setErrorMessage("Erro ao adicionar comentário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function editCommentSubmit(data: ComentarioFormValues) {
    if (!filmeId || !user?.id || !existingCommentData?.id) {
      setErrorMessage(
        "ID do filme, usuário ou comentário para edição não encontrados."
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const payload = {
        comentario: data.comentario,
      };

      console.log("Enviando payload para atualizar comentário:", payload);

      const updatedComentario = await editarComentario(
        existingCommentData.id.toString(),
        payload
      );
      console.log("Comentário atualizado:", updatedComentario);

      setSuccessMessage("Comentário atualizado com sucesso!");
      
      // Aguarda um curto período para que o usuário veja a mensagem de sucesso
      setTimeout(() => {
        // Navega para a página de perfil ao invés da página do filme
        navigate("/profile", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Erro ao atualizar o comentário. Tente novamente.");
      } else {
        setErrorMessage("Erro ao atualizar o comentário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AddComentContainer>
      <h2>
        {action === "atualizar" ? "Editar Comentário" : "Adicionar Comentário"}
      </h2>

      {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form
        onSubmit={handleRegisterComment(
          action === "atualizar" ? editCommentSubmit : registerCommentSubmit
        )}
      >
        <div className="form-group">
          <label htmlFor="comentario">Seu comentário:</label>
          <textarea
            id="comentario"
            placeholder="Escreva seu comentário sobre o filme..."
            rows={5}
            className="textarea-input"
            {...registerComment("comentario")}
            disabled={loading}
          />
          {errosRegisterComment.comentario && (
            <ErrorSpan>{errosRegisterComment.comentario.message}</ErrorSpan>
          )}
        </div>

        <div className="button-group">
          <Button
            type="button"
            onClick={() => navigate("/profile", { replace: true })}
            variant="default"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Enviando..."
              : action === "atualizar"
              ? "Atualizar Comentário"
              : "Adicionar Comentário"}
          </Button>
        </div>
      </form>
    </AddComentContainer>
  );
}