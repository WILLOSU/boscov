// criação do componente card, usando props
import { Filme } from "../../Datas";
import { CardContainer, CardBody, CardFooter} from "./CardStyle";

interface CardProps {
  filme: Filme;
}

export function Card({ filme }: CardProps) {
  return (
    <CardContainer>
      <CardBody>
       
        {/* CardBody é a img, nome do filme e sinopse */}
        <div>
          <h2>{filme.nome}</h2>
          <p>{filme.sinopse}</p>
        </div>
        <img src={filme.poster} alt={`Poster de ${filme.nome}`} />
      </CardBody>

      <CardFooter>
        {" "}{/* CardFooter 2 nota e comentário */}
        <div>
        <i className="bi bi-star-fill"></i>
        <span>{filme.nota}</span>
        </div>
        <div>
        <i className="bi bi-chat-fill"></i>
        <span>{filme.comentario}</span>
        </div>
      </CardFooter>

      <article>
        {" "}
        {/* article 3 é a Classifi.., Duração e Gênero */}
        <div>
          <p>Classificação: {filme.classificacao}</p>
          <p>Duração: {filme.duracao}</p>
          <p>Gênero: {filme.genero}</p>
        </div>
      </article>
    </CardContainer>
  );
}
