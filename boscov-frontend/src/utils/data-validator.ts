import type { UserData } from "../Context/UserContext";
import type { Filme } from "../Datas";
import type { FilmeDataFromBackend } from "../components/Interface/Types"; // Importe a interface correta do backend

/**
 * Valida e normaliza os dados do usuário
 * @param userData Dados do usuário a serem validados
 * @returns Dados do usuário normalizados
 */
export function validateUserData(userData: unknown): UserData {
  if (!userData || typeof userData !== "object") {
    throw new Error("Dados de usuário inválidos");
  }

  const data = userData as Record<string, unknown>;

  // Verifica e normaliza os campos obrigatórios
  const id = typeof data.id === "number" ? data.id : typeof data.id === "string" ? Number.parseInt(data.id, 10) : 0;

  const nome =
    typeof data.nome === "string"
      ? data.nome
      : typeof data.nome === "object" && data.nome && "descricao" in data.nome
        ? String((data.nome as Record<string, unknown>).descricao || "")
        : "";

  const email =
    typeof data.email === "string"
      ? data.email
      : typeof data.email === "object" && data.email && "descricao" in data.email
        ? String((data.email as Record<string, unknown>).descricao || "")
        : "";

  // Campos opcionais
  const username = typeof data.username === "string" ? data.username : undefined;
  const avatar = typeof data.avatar === "string" ? data.avatar : undefined;
  const background = typeof data.background === "string" ? data.background : undefined;

  return {
    id,
    nome,
    email,
    username,
    avatar,
    background,
  };
}

/**
 * Valida e normaliza os dados do filme
 * @param filmeData Dados do filme a serem validados (espera FilmeDataFromBackend)
 * @returns Dados do filme normalizados (retorna Filme)
 */
export function validateFilmeData(filmeData: unknown): Filme {
  if (!filmeData || typeof filmeData !== "object") {
    throw new Error("Dados de filme inválidos");
  }

  const data = filmeData as FilmeDataFromBackend; // Agora tipamos como FilmeDataFromBackend

  // Normaliza os campos
  const id = data.id;
  const nome = data.nome || "";
  const sinopse = data.sinopse || "";
  const poster = data.poster || "";
  const classificacao = data.classificacao || "";
  const duracao = String(data.duracao) || "";
  const genero = ""; // Você pode manter isso, mas os gêneros detalhados estão em genero_filme
  const nota = ""; // Adicione a normalização se a nota estiver presente em FilmeDataFromBackend
  const comentario = ""; // Adicione a normalização se o comentário estiver presente em FilmeDataFromBackend

  // Normaliza a propriedade genero_filme
  const genero_filme = Array.isArray(data.genero_filme)
    ? data.genero_filme.map((item) => ({
        genero: {
          id: item.genero?.id,
          descricao: item.genero?.descricao || "",
        },
      }))
    : [];

  return {
    id,
    nome,
    sinopse,
    poster,
    classificacao,
    duracao,
    genero,
    nota,
    comentario,
    genero_filme,
  };
}