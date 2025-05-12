import type { Filme } from "../../Datas";
import {
  CardContainer,
  CardBody,
  CardFooter,
  CardRight,
  EditIcon,
  AvaliacaoContainer, 
  NotaMedia,
  TotalAvaliacoes,
} from "./CardStyle";
import { Link } from "react-router-dom";
import { useFilmeAvaliacao } from "../../hooks/useFilmeAvaliacao";
import { EstrelasAvaliacao } from "../EstrellasAvaliacao/EstrellasAvaliacao";

interface CardProps {
  filme:
    | (Filme & {
        genero_filme?: { genero: { id: number; descricao: string } }[];
      })
    | null
    | undefined;
  top?: boolean;
  showEditIcon?: boolean;
}

const safeRender = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj?.descricao && typeof obj.descricao === "string")
      return obj.descricao;
    if (obj?.nome && typeof obj.nome === "string") return obj.nome;
    if (obj?.id) return String(obj.id);

    try {
      return JSON.stringify(value);
    } catch {
      return "[Object]";
    }
  }

  return String(value);
};

export function Card({ filme, top = false, showEditIcon = false }: CardProps) {
  // Usando o hook personalizado para buscar avaliações
  const { mediaAvaliacoes, totalAvaliacoes, loading } = useFilmeAvaliacao(
    filme?.id
  );

  return (
    <CardContainer>
      <CardBody $top={top}>
        {showEditIcon && (
          <Link
            to={`/manage-filmes/edit/${filme?.id}`}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1,
            }}
          >
            <EditIcon className="bi bi-pencil-square" />
          </Link>
        )}
        <div>
          <h2>{safeRender(filme?.nome)}</h2>
          <p>{safeRender(filme?.sinopse)}</p>

          {/* Seção de Avaliação Centralizada e Estilizada */}
          <AvaliacaoContainer>
            {loading ? (
              <span style={{ fontSize: "0.85rem", color: "#777" }}>
                Carregando avaliações...
              </span>
            ) : (
              <>
                <NotaMedia>{mediaAvaliacoes.toFixed(1)}</NotaMedia>
                <EstrelasAvaliacao
                  nota={mediaAvaliacoes}
                  tamanho="medio" // Ajustei o tamanho para melhor visualização
                  somenteLeitura={true}
                  exibirValor={false}
                />
                <TotalAvaliacoes>
                  ({totalAvaliacoes}{" "}
                  {totalAvaliacoes === 1 ? "avaliação" : "avaliações"})
                </TotalAvaliacoes>
              </>
            )}
          </AvaliacaoContainer>
        </div>
        <CardRight>
          <img
            src={filme?.poster || "/placeholder.svg"}
            alt={`Poster de ${safeRender(filme?.nome)}`}
          />
          <article className="detalhes">
            <div>
              <p>Classificação: {safeRender(filme?.classificacao)}</p>
              <p>Duração: {safeRender(filme?.duracao)}</p>
              <br />
              <p>Gênero (s):</p>
              {filme?.genero_filme && filme.genero_filme.length > 0 ? (
                <div style={{ marginLeft: "1px" }}>
                  {filme.genero_filme.map((gf) => (
                    <p key={gf.genero.id} style={{ marginBottom: "5px" }}>
                      {safeRender(gf.genero.descricao)}
                    </p>
                  ))}
                </div>
              ) : (
                <p>Não definido</p>
              )}
            </div>
          </article>
        </CardRight>
      </CardBody>
      <CardFooter>
        <div>
          {/* Link para avaliação por estrelas */}
          <Link to={`/filme/${filme?.id}/avaliar`} title="Avaliar filme">
            <i className="bi bi-star-fill"></i>
          </Link>
          <span>{loading ? "..." : mediaAvaliacoes.toFixed(1)}</span>
        </div>
        <div>
          {/* Link para comentários */}
          <Link
            to={`/filme/${filme?.id}/comentario/adicionar`}
            title="Adicionar comentário"
          >
            <i className="bi bi-chat-fill"></i>
          </Link>
          <span>{safeRender(filme?.comentario)}</span>
        </div>
      </CardFooter>
    </CardContainer>
  );
}
