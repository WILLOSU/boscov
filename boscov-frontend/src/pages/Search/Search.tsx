import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { searchFilmes } from "../../services/filmesServices";
import axios, { AxiosError } from "axios";
import { Card } from "../../components/Card/Card";
import { ContainerResults, SearchPosts, TextResults } from "./SearchStyled";
interface Filme {
  id: number;
  nome: string;
  sinopse: string;
  poster: string;
  classificacao: string;
  duracao: string;
  genero: string;
  nota: string;
  comentario: string;
}

export function Search() {
  const { title = "" } = useParams();
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const search = useCallback(async () => {
    try {
      const response = await searchFilmes(title, 1000, 0);

      if (response.data && response.data.results) {
        setFilmes(response.data.results);
        setErro(null);
      } else {
        console.warn(
          "Dados recebidos não contêm o campo 'results':",
          response.data
        );
        setFilmes([]);
        setErro("Dados recebidos não estão no formato esperado");
      }
    } catch (err: unknown) {
      console.error("Erro ao fazer a requisição:", err);

      // Verificar se é um erro do Axios
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          console.error("Dados do erro:", axiosError.response.data);
          console.error("Status do erro:", axiosError.response.status);
          console.error("Headers do erro:", axiosError.response.headers);
          setErro(
            `Erro ${axiosError.response.status}: ${JSON.stringify(
              axiosError.response.data
            )}`
          );
        } else if (axiosError.request) {
          console.error(
            "Requisição foi feita mas não houve resposta:",
            axiosError.request
          );
          setErro("Servidor não respondeu à requisição");
        } else {
          console.error(
            "Erro na configuração da requisição:",
            axiosError.message
          );
          setErro(`Erro: ${axiosError.message}`);
        }
      } else {
        // Para outros tipos de erro
        const error = err as Error;
        console.error("Erro não relacionado ao Axios:", error.message);
        setErro(`Erro: ${error.message}`);
      }

      setFilmes([]);
    }
  }, [title]);

  useEffect(() => {
    console.log("useEffect disparado, chamando search()");
    search();
  }, [search]);

  console.log("Estado atual de filmes:", filmes);

  return (
    <ContainerResults>
      <TextResults>
        <span>
          {filmes.length
            ? `Encontramos ${filmes.length} ${
                filmes.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não encontramos resultados para:"}
        </span>
        <h2>{title}</h2>
      </TextResults>

      {erro && (
        <div style={{ color: "red", margin: "10px 0" }}>
          <p>
            <strong>Erro:</strong> {erro}
          </p>
        </div>
      )}

      <SearchPosts>
        {filmes.map((filme) => (
          <Card
            key={filme.id}
            filme={{
              ...filme,
              title: filme.nome, // Adicionando a propriedade title
              nome: filme.nome,
            }}
            top={false}
          />
        ))}
      </SearchPosts>
    </ContainerResults>
  );
}
