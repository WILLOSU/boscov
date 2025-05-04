import type { Filme } from "../../Datas";
import { CardContainer, CardBody, CardFooter, CardRight, EditIcon } from "./CardStyle";
import { Link } from "react-router-dom";

interface CardProps {
    filme: Filme;
    top?: boolean;
    showEditIcon?: boolean; // Nova prop para controlar a exibição do ícone
}

// Função auxiliar para renderizar texto com segurança
const safeRender = (value: unknown): string => {
    if (value === null || value === undefined) {
        return "";
    }

    if (typeof value === "object") {
        const obj = value as Record<string, unknown>;
        if (obj.descricao && typeof obj.descricao === "string") return obj.descricao;
        if (obj.nome && typeof obj.nome === "string") return obj.nome;
        if (obj.id) return String(obj.id);

        try {
            return JSON.stringify(value);
        } catch {
            return "[Object]";
        }
    }

    return String(value);
};

export function Card({ filme, top = false, showEditIcon = false }: CardProps) {
    return (
        <CardContainer>
            <CardBody $top={top} style={{ position: 'relative' }}> {/* Adicione position: 'relative' ao CardBody */}
                {showEditIcon && (
                    <Link to={`/manage-filmes/edit/${filme.id}`} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                        <EditIcon className="bi bi-pencil-square" /> {/* Use o styled component EditIcon */}
                    </Link>
                )}
                {/* Parte esquerda - nome e sinopse */}
                <div>
                    <h2>{safeRender(filme.nome)}</h2>
                    <p>{safeRender(filme.sinopse)}</p>
                </div>

                {/* Parte direita - imagem + detalhes */}
                <CardRight>
                    <img src={filme.poster || "/placeholder.svg"} alt={`Poster de ${safeRender(filme.nome)}`} />

                    <article className="detalhes">
                        {/* article 3 é a Classifi.., Duração e Gênero */}
                        <div>
                            <p>Classificação: {safeRender(filme.classificacao)}</p>
                            <p>Duração: {safeRender(filme.duracao)}</p>
                            <p>Gênero: {safeRender(filme.genero)}</p>
                        </div>
                    </article>
                </CardRight>
            </CardBody>

            <CardFooter>
                {/* CardFooter 2 nota e comentário */}
                <div>
                    <i className="bi bi-star-fill"></i>
                    <span>{safeRender(filme.nota)}</span>
                </div>
                <div>
                    <i className="bi bi-chat-fill"></i>
                    <span>{safeRender(filme.comentario)}</span>
                </div>
            </CardFooter>
        </CardContainer>
    );
}