import axios from "axios"
import Cookies from "js-cookie"
import type { Filme } from "../Datas"
import type { FilmesData } from "../components/Interface/Types"

const baseUrl: string = "http://localhost:3000"
//const baseUrl = "https://renderboscov.onrender.com";

// Função auxiliar para obter o token
const getToken = () => {
  const token = Cookies.get("token")
  if (!token) {
    console.error("Token de autenticação não encontrado")
    throw new Error("Token de autenticação não encontrado")
  }
  return token
}

// Função para criar filme
export async function createFilmes(filmesData: FilmesData) {
  try {
    const token = getToken()

    console.log("Dados enviados para API:", JSON.stringify(filmesData, null, 2))

    // Vamos verificar a resposta completa para diagnóstico
    const response = await axios.post(`${baseUrl}/api`, filmesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Adicionada correção aqui: removido o parâmetro não utilizado
      validateStatus: () => {
        return true // Sempre retorna true para não rejeitar a promise
      },
    })

    console.log("Status da resposta:", response.status)
    console.log("Resposta completa:", response)

    if (response.status >= 400) {
      throw new Error(`Erro ${response.status}: ${JSON.stringify(response.data)}`)
    }

    return response.data
  } catch (error) {
    console.error("Erro ao criar filme:", error)

    // Log detalhado do erro
    if (axios.isAxiosError(error) && error.response) {
      console.error("Status:", error.response.status)
      console.error("Dados da resposta:", error.response.data)
      console.error("Headers:", error.response.headers)

      // Mostrar mensagem mais específica baseada na resposta
      if (error.response.data && typeof error.response.data === "object") {
        const errorMessage = error.response.data.message || JSON.stringify(error.response.data)
        throw new Error(`Erro do servidor: ${errorMessage}`)
      }
    }

    throw error
  }
}


export async function getAllFilmes() {
  try {
    const response = await axios.get(`${baseUrl}/api/posts`)
    return response
  } catch (error) {
    console.error("Erro ao buscar todos os filmes:", error)
    throw error
  }
}

export async function getTopFilme() {
  try {
    const response = await axios.get(`${baseUrl}/api/top`)
    return response
  } catch (error) {
    console.error("Erro ao buscar top filme:", error)
    throw error
  }
}

export const searchFilmes = async (titulo: string, limit = 1000, offset = 0) => {
  const url = `${baseUrl}/api/search`
  return await axios.get(url, {
    params: { nome: titulo, limit, offset },
  })
}


export async function getAllPostsByUser(userId: number): Promise<Filme[]> {
  try {
    if (!userId) {
      throw new Error("ID do usuário não fornecido");
    }

    const token = getToken();
    const response = await axios.get<Filme[]>(`${baseUrl}/api/byUserId/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    return [];
  }
}

// Função para buscar filme por ID
export async function getFilmesById(id: string) {
  try {
    const token = getToken()
    const response = await axios.get(`${baseUrl}/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Erro ao buscar filme por ID:", error)
    throw error
  }
}

// Função para atualizar filme
export async function updateFilme(id: string, filmesData: FilmesData) {
  try {
    const token = getToken()

    console.log("Dados enviados para atualização:", JSON.stringify(filmesData, null, 2))

    const response = await axios.put(`${baseUrl}/api/${id}`, filmesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("Resposta da API (atualização):", response.data)
    return response.data
  } catch (error) {
    console.error("Erro ao atualizar filme:", error)

    // Log detalhado do erro
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status)
      console.error("Dados da resposta:", error.response?.data)
      console.error("Headers:", error.response?.headers)
    }

    throw error
  }
}

// Função para excluir filme
export async function deleteFilme(id: string) {
  try {
    const token = getToken()
    const response = await axios.delete(`${baseUrl}/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Erro ao excluir filme:", error)
    throw error
  }
}

// Função para desativar filme
export async function desativarFilme(id: string) {
  try {
    const token = getToken()
    const response = await axios.patch(
      `${baseUrl}/api/${id}/desativar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error("Erro ao desativar filme:", error)
    throw error
  }
}

// Função para restaurar filme
export async function restaurarFilme(id: string) {
  try {
    const token = getToken()
    const response = await axios.patch(
      `${baseUrl}/api/${id}/restaurar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error("Erro ao restaurar filme:", error)
    throw error
  }
}