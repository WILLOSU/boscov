import type { UserData } from "../Context/UserContext"
import type { Filme } from "../Datas"

/**
 * Valida e normaliza os dados do usuário
 * @param userData Dados do usuário a serem validados
 * @returns Dados do usuário normalizados
 */
export function validateUserData(userData: unknown): UserData {
  if (!userData || typeof userData !== "object") {
    throw new Error("Dados de usuário inválidos")
  }

  const data = userData as Record<string, unknown>

  // Verifica e normaliza os campos obrigatórios
  const id = typeof data.id === "number" ? data.id : typeof data.id === "string" ? Number.parseInt(data.id, 10) : 0

  const nome =
    typeof data.nome === "string"
      ? data.nome
      : typeof data.nome === "object" && data.nome && "descricao" in data.nome
        ? String((data.nome as Record<string, unknown>).descricao || "")
        : ""

  const email =
    typeof data.email === "string"
      ? data.email
      : typeof data.email === "object" && data.email && "descricao" in data.email
        ? String((data.email as Record<string, unknown>).descricao || "")
        : ""

  // Campos opcionais
  const username = typeof data.username === "string" ? data.username : undefined
  const avatar = typeof data.avatar === "string" ? data.avatar : undefined
  const background = typeof data.background === "string" ? data.background : undefined

  return {
    id,
    nome,
    email,
    username,
    avatar,
    background,
  }
}

/**
 * Valida e normaliza os dados do filme
 * @param filmeData Dados do filme a serem validados
 * @returns Dados do filme normalizados
 */
export function validateFilmeData(filmeData: unknown): Filme {
  if (!filmeData || typeof filmeData !== "object") {
    throw new Error("Dados de filme inválidos")
  }

  const data = filmeData as Record<string, unknown>

  // Normaliza os campos
  const id =
    typeof data.id === "number" ? data.id : typeof data.id === "string" ? Number.parseInt(data.id, 10) : undefined

  const nome =
    typeof data.nome === "string"
      ? data.nome
      : typeof data.nome === "object" && data.nome
        ? String((data.nome as Record<string, unknown>).descricao || "")
        : ""

  const sinopse =
    typeof data.sinopse === "string"
      ? data.sinopse
      : typeof data.sinopse === "object" && data.sinopse
        ? String((data.sinopse as Record<string, unknown>).descricao || "")
        : ""

  const poster = typeof data.poster === "string" ? data.poster : ""
  const classificacao = typeof data.classificacao === "string" ? data.classificacao : ""
  const duracao = typeof data.duracao === "string" ? data.duracao : ""
  const genero = typeof data.genero === "string" ? data.genero : ""
  const nota = typeof data.nota === "string" ? data.nota : typeof data.nota === "number" ? String(data.nota) : ""
  const comentario =
    typeof data.comentario === "string"
      ? data.comentario
      : typeof data.comentario === "object" && data.comentario
        ? String((data.comentario as Record<string, unknown>).id || "")
        : ""

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
  }
}
