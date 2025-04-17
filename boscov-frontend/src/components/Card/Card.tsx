import { Filme } from "../../Datas";
import {
  CardContainer,
  CardBody,
  CardFooter,
  CardRight
} from "./CardStyle";

interface CardProps {
  filme: Filme;
}

export function Card({ filme }: CardProps) {
  return (
    <CardContainer>
      <CardBody>
        {/* Parte esquerda - nome e sinopse */}
        <div>
          <h2>{filme.nome}</h2>
          <p>{filme.sinopse}</p>
        </div>

        {/* Parte direita - imagem + detalhes */}
        <CardRight>
          <img src={filme.poster} alt={`Poster de ${filme.nome}`} />
          
          <article className="detalhes">
            {/* article 3 é a Classifi.., Duração e Gênero */}
            <div>
              <p>Classificação: {filme.classificacao}</p>
              <p>Duração: {filme.duracao}</p>
              <p>Gênero: {filme.genero}</p>
            </div>
          </article>
        </CardRight>
      </CardBody>

      <CardFooter>
        {/* CardFooter 2 nota e comentário */}
        <div>
          <i className="bi bi-star-fill"></i>
          <span>{filme.nota}</span>
        </div>
        <div>
          <i className="bi bi-chat-fill"></i>
          <span>{filme.comentario}</span>
        </div>
      </CardFooter>
    </CardContainer>
  );
}
