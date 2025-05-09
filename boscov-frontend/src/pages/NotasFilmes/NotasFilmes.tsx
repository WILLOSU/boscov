"use client";

import { type JSX, useContext, useState, useEffect } from "react";
import { AvaliacaoContainer } from "./NotasFilmesStyled";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../Context/UserContext";
import { avaliarFilme, getNotasEstrelas } from "../../services/filmesServices";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { StarRating } from "../../components/NotasFilmes/NotasFilmes";
import type { AvaliarFilmePayload } from "../../Datas";
import { useForm } from "react-hook-form";
import axios from "axios";

interface AvaliacaoFormValues {
  nota: number;
}

export function AvaliacaoEstrelas(): JSX.Element {
  const { id: filmeIdParam } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [existingRating, setExistingRating] = useState<number>(0);
  const filmeId = filmeIdParam ? Number.parseInt(filmeIdParam, 10) : null;

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AvaliacaoFormValues>({
    defaultValues: { nota: 0 },
  });

  useEffect(() => {
    const fetchExistingRating = async () => {
      if (filmeId && user?.id) {
        setLoading(true);
        setErrorMessage(null);
        try {
          const avaliacaoData = await getNotasEstrelas(String(filmeId));
          if (avaliacaoData && avaliacaoData.nota) {
            setExistingRating(avaliacaoData.nota);
            setValue("nota", avaliacaoData.nota);
          } else {
            reset({ nota: 0 });
          }
        } catch (error) {
          console.error("Erro ao carregar avaliação existente:", error);
          if (axios.isAxiosError(error) && error.response?.status !== 404) {
            setErrorMessage("Erro ao carregar sua avaliação anterior.");
          }
          reset({ nota: 0 });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExistingRating();
     
  }, [filmeId, user?.id, setValue, reset]);

  async function handleRatingSubmit(data: AvaliacaoFormValues) {
    if (!filmeId || !user?.id) {
      setErrorMessage("ID do filme ou informações do usuário não encontradas.");
      return;
    }

    if (data.nota < 1 || data.nota > 5) {
      setErrorMessage("Por favor, selecione uma avaliação entre 1 e 5 estrelas.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const payload: AvaliarFilmePayload = {
        nota: data.nota,
        comentario: "",
      };

      console.log("Enviando payload para avaliarFilme:", payload);

      const novaAvaliacao = await avaliarFilme(String(filmeId), payload);
      console.log("Avaliação criada/atualizada:", novaAvaliacao);

      setSuccessMessage("Avaliação enviada com sucesso!");

      setTimeout(() => {
        navigate(`/filme/${filmeId}`);
      }, 1500);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      setErrorMessage("Erro ao enviar a avaliação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const handleRatingChange = (newRating: number) => {
    setValue("nota", newRating);
    setExistingRating(newRating); // Atualiza o estado local para refletir a mudança imediata na UI
  };

  return (
    <AvaliacaoContainer>
      <h2>Avaliar Filme</h2>

      {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit(handleRatingSubmit)}>
        <div className="rating-container">
          <p>Selecione sua avaliação:</p>
          <StarRating
            initialRating={existingRating}
            onRatingChange={handleRatingChange}
            size="large"
          />
          <p className="rating-value">{existingRating} de 5 estrelas</p>
          {errors.nota && <ErrorSpan>{errors.nota.message}</ErrorSpan>}
        </div>

        <div className="button-group">
          <Button
            type="button"
            onClick={() => navigate(`/filme/${filmeId}`)}
            variant="default"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading || existingRating === 0}>
            {loading ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </div>
      </form>
    </AvaliacaoContainer>
  );
}