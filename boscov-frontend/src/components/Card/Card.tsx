import type { Filme } from "../../Datas";
import { CardContainer, CardBody, CardFooter, CardRight, EditIcon } from "./CardStyle";
import { Link } from "react-router-dom";

interface CardProps {
  filme: Filme & { genero_filme?: { genero: { id: number; descricao: string } }[] } | null | undefined;
  top?: boolean;
  showEditIcon?: boolean;
}

const safeRender = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj?.descricao && typeof obj.descricao === "string") return obj.descricao;
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
  console.log("Dados do filme no Card:", filme); // Console para ver o objeto filme completo

  if (filme?.genero_filme) {
    console.log("filme.genero_filme:", filme.genero_filme); // Console para ver a propriedade genero_filme
    filme.genero_filme.forEach((gf, index) => {
      console.log(`Gênero ${index + 1}:`, gf); // Console para ver cada item dentro de genero_filme
      if (gf?.genero) {
        console.log(`  Descrição do Gênero ${index + 1}:`, gf.genero.descricao); // Console para ver a descrição
      } else {
        console.log(`  Gênero ${index + 1} não possui a propriedade 'genero'`);
      }
    });
  } else {
    console.log("filme.genero_filme é nulo ou indefinido.");
  }

  return (
    <CardContainer>
      <CardBody $top={top} style={{ position: 'relative' }}>
        {showEditIcon && (
          <Link to={`/manage-filmes/edit/${filme?.id}`} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
            <EditIcon className="bi bi-pencil-square" />
          </Link>
        )}
        <div>
          <h2>{safeRender(filme?.nome)}</h2>
          <p>{safeRender(filme?.sinopse)}</p>
        </div>
        <CardRight>
          <img src={filme?.poster || "/placeholder.svg"} alt={`Poster de ${safeRender(filme?.nome)}`} />
          <article className="detalhes">
            <div>
              <p>Classificação: {safeRender(filme?.classificacao)}</p>
              <p>Duração: {safeRender(filme?.duracao)}</p>
              <br />
              <p>Gênero (s):</p>
              {filme?.genero_filme && filme.genero_filme.length > 0 ? (
                <div style={{ marginLeft: '10px' }}> {/* Adiciona um pequeno recuo */}
                  {filme.genero_filme.map((gf) => (
                    <p key={gf.genero.id} style={{ marginBottom: '5px' }}>
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
          <i className="bi bi-star-fill"></i>
          <span>{safeRender(filme?.nota)}</span>
        </div>
        <div>
          <i className="bi bi-chat-fill"></i>
          <span>{safeRender(filme?.comentario)}</span>
        </div>
      </CardFooter>
    </CardContainer>
  );
}