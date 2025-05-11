"use client";

import { type JSX, useContext, useState, useEffect } from "react";
import { AvaliacaoContainer } from "./AvaliacaoFilmeStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  avaliacaoSchema,
  type AvaliacaoFormValues,
} from "../../schemas/avaliacaoSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../Context/UserContext";
import {
  adicionarAvaliacao,
  criarNota,
  editarAvaliacao,
  getAvaliacao,
  verificarAvaliacaoExistente,
} from "../../services/avaliacaoServices";
import axios from "axios";
import type { AvaliacaoFrontend } from "../../components/Interface/Types";

export function AvaliacaoFilme(): JSX.Element {
  const { id: filmeIdParam } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [action, setAction] = useState<"adicionar" | "atualizar">("adicionar");
  const [existingAvaliacaoData, setExistingAvaliacaoData] =
    useState<AvaliacaoFrontend | null>(null);
  const filmeId = filmeIdParam ? Number.parseInt(filmeIdParam, 10) : null;

  const {
    register: registerAvaliacao,
    handleSubmit: handleRegisterAvaliacao,
    formState: { errors: errosRegisterAvaliacao },
    reset,
    setValue,
    watch,
  } = useForm<AvaliacaoFormValues>({
    resolver: zodResolver(avaliacaoSchema),
    defaultValues: {
      nota: undefined, // Inicialmente undefined para forçar o usuário a selecionar
    },
  });

  useEffect(() => {
    const fetchExistingAvaliacao = async () => {
      if (filmeId && user?.id) {
        setLoading(true);
        setErrorMessage(null);
        try {
          // Primeiro verificamos se o usuário já avaliou o filme
          const hasRating = await verificarAvaliacaoExistente(filmeId);
          console.log("Usuário já avaliou o filme?", hasRating);

          if (hasRating) {
            // Se já avaliou, buscamos a avaliação
            const existingAvaliacao = await getAvaliacao(filmeId);
            console.log("Avaliação encontrada:", existingAvaliacao);

            setExistingAvaliacaoData(existingAvaliacao);
            if (existingAvaliacao?.nota) {
              setAction("atualizar");
              setValue("nota", existingAvaliacao.nota);
            }
          } else {
            // Se não avaliou, preparamos para adicionar
            setAction("adicionar");
            reset();
          }
        } catch (error) {
          console.error("Erro ao carregar avaliação existente:", error);
          // Se não encontrar avaliação, não mostra erro - é comportamento normal
          if (axios.isAxiosError(error) && error.response?.status !== 404) {
            setErrorMessage("Erro ao carregar sua avaliação anterior.");
          }
          setAction("adicionar");
          reset();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExistingAvaliacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmeId, user?.id]);

  async function registerAvaliacaoSubmit(data: AvaliacaoFormValues) {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!filmeId) {
        setErrorMessage("ID do filme não encontrado.");
        return;
      }

      console.log("Enviando avaliação para o filme:", filmeId);
      console.log("Dados do formulário:", data);

      if (data.nota !== undefined) {
        // Garantir que nota seja um número
        const notaValue = Number(data.nota);

        // Verificar se é um número válido
        if (isNaN(notaValue)) {
          setErrorMessage("A nota precisa ser um número válido entre 1 e 5.");
          return;
        }

        // Tentar primeiro com criarNota (POST /notas)
        try {
          const novaAvaliacao = await criarNota(filmeId, notaValue);
          console.log("Avaliação criada com POST:", novaAvaliacao);
          setSuccessMessage("Avaliação adicionada com sucesso!");
        } catch (error) {
          console.error("Erro ao criar nota com POST, tentando PATCH:", error);

          // Se falhar, tentar com adicionarAvaliacao (PATCH /nota/:id)
          const novaAvaliacao = await adicionarAvaliacao(filmeId, notaValue);
          console.log("Avaliação criada com PATCH:", novaAvaliacao);
          setSuccessMessage("Avaliação adicionada com sucesso!");
        }

        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 1500);
      } else {
        setErrorMessage("Por favor, selecione uma nota.");
      }
    } catch (error) {
      console.error("Erro ao adicionar avaliação:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Erro ao adicionar avaliação. Verifique se a nota está no formato correto (0-5)."
        );
      } else {
        setErrorMessage("Erro ao adicionar avaliação. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function editAvaliacaoSubmit(data: AvaliacaoFormValues) {
    if (!filmeId || !user?.id || !existingAvaliacaoData?.id) {
      setErrorMessage(
        "ID do filme, usuário ou avaliação para edição não encontrados."
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      // Garantir que nota seja um número
      const notaValue = Number(data.nota);

      // Verificar se é um número válido
      if (isNaN(notaValue)) {
        setErrorMessage("A nota precisa ser um número válido entre 1 e 5.");
        return;
      }

      const payload = {
        nota: notaValue,
      };

      console.log("Enviando payload para atualizar avaliação:", payload);

      const avaliacaoId = existingAvaliacaoData.id.toString();
      const updatedAvaliacao = await editarAvaliacao(avaliacaoId, payload);
      console.log("Avaliação atualizada:", updatedAvaliacao);

      setSuccessMessage("Avaliação atualizada com sucesso!");

      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Erro ao atualizar a avaliação. Verifique se a nota está no formato correto (0-5)."
        );
      } else {
        setErrorMessage("Erro ao atualizar a avaliação. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AvaliacaoContainer>
      <h2>
        {action === "atualizar" ? "Editar Avaliação" : "Adicionar Avaliação"}
      </h2>

      {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form
        onSubmit={handleRegisterAvaliacao(
          action === "atualizar" ? editAvaliacaoSubmit : registerAvaliacaoSubmit
        )}
      >
        <div className="form-group">
          <label htmlFor="nota">Sua avaliação (1-5):</label>
          <div className="rating-selector">
            {[1, 2, 3, 4, 5].map((valor) => (
              <div key={valor} className="rating-option">
                <input
                  type="radio"
                  id={`nota-${valor}`}
                  name="nota-radio" // Nome diferente para não conflitar
                  value={valor}
                  disabled={loading}
                  onChange={(e) => {
                    // Converter para número e definir no formulário
                    const notaValue = Number(e.target.value);
                    setValue("nota", notaValue);
                  }}
                  checked={watch("nota") === valor} // Usando watch para sincronizar
                />
                <label htmlFor={`nota-${valor}`}>{valor} ⭐</label>
              </div>
            ))}

            {/* Campo oculto para armazenar o valor como número */}
            <input
              type="hidden"
              {...registerAvaliacao("nota", {
                valueAsNumber: true,
              })}
            />
          </div>
          {errosRegisterAvaliacao.nota && (
            <ErrorSpan>{errosRegisterAvaliacao.nota.message}</ErrorSpan>
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
              ? "Atualizar Avaliação"
              : "Adicionar Avaliação"}
          </Button>
        </div>
      </form>
    </AvaliacaoContainer>
  );
}
