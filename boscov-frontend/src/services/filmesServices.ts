import axios from "axios";
import Cookies from "js-cookie";
import type { Filme, AvaliacaoFrontend, AvaliarFilmePayload } from "../Datas";
import type { FilmesData } from "../components/Interface/Types";

const baseUrl: string = "http://localhost:3000";
//const baseUrl = "https://renderboscov.onrender.com";

//// CRUD FILME

// CREATE
export async function createFilmes(filmesData: FilmesData) {
  try {
    const token = getToken();

    console.log(
      "Dados enviados para API:",
      JSON.stringify(filmesData, null, 2)
    );

    const response = await axios.post(`${baseUrl}/api`, filmesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      validateStatus: () => {
        return true; // Sempre retorna true para não rejeitar a promise
      },
    });

    console.log("Status da resposta:", response.status);
    console.log("Resposta completa:", response);

    if (response.status >= 400) {
      throw new Error(
        `Erro ${response.status}: ${JSON.stringify(response.data)}`
      );
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao criar filme:", error);

    if (axios.isAxiosError(error) && error.response) {
      console.error("Status:", error.response.status);
      console.error("Dados da resposta:", error.response.data);
      console.error("Headers:", error.response.headers);

      if (error.response.data && typeof error.response.data === "object") {
        const errorMessage =
          error.response.data.message || JSON.stringify(error.response.data);
        throw new Error(`Erro do servidor: ${errorMessage}`);
      }
    }

    throw error;
  }
}

// UPDATE
export async function updateFilme(id: string, filmesData: FilmesData) {
  try {
    const token = getToken();

    console.log(
      "Dados enviados para atualização:",
      JSON.stringify(filmesData, null, 2)
    );

    const response = await axios.put(`${baseUrl}/api/${id}`, filmesData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Resposta da API (atualização):", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Dados da resposta:", error.response?.data);
      console.error("Headers:", error.response?.headers);
    }

    throw error;
  }
}

// EXCLUIR
export async function deleteFilme(id: string) {
  try {
    const token = getToken();
    const response = await axios.delete(`${baseUrl}/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir filme:", error);
    throw error;
  }
}

// DESATIVAR
export async function desativarFilme(id: string) {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${baseUrl}/api/${id}/desativar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao desativar filme:", error);
    throw error;
  }
}

// RESTAURAR
export async function restaurarFilme(id: string) {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${baseUrl}/api/${id}/restaurar`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao restaurar filme:", error);
    throw error;
  }
}

// TOKEN
export const getToken = () => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("Token de autenticação não encontrado");
    throw new Error("Token de autenticação não encontrado");
  }
  return token;
};

// TDS FILMES
export async function getAllFilmes() {
  try {
    const response = await axios.get(`${baseUrl}/api/posts`);
    return response;
  } catch (error) {
    console.error("Erro ao buscar todos os filmes:", error);
    throw error;
  }
}

export async function getTopFilme() {
  try {
    const response = await axios.get(`${baseUrl}/api/top`);
    return response;
  } catch (error) {
    console.error("Erro ao buscar top filme:", error);
    throw error;
  }
}

export const searchFilmes = async (
  titulo: string,
  limit = 1000,
  offset = 0
) => {
  const url = `${baseUrl}/api/search`;
  return await axios.get(url, {
    params: { nome: titulo, limit, offset },
  });
};

// FILMES POR USUÁRIO
export async function getAllPostsByUser(userId: number): Promise<Filme[]> {
  try {
    if (!userId) {
      throw new Error("ID do usuário não fornecido");
    }

    const token = getToken();
    const response = await axios.get<Filme[]>(
      `${baseUrl}/api/byUserId/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    return [];
  }
}

// FILMES POR
export async function getFilmesById(id: string) {
  try {
    const token = getToken();
    const response = await axios.get(`${baseUrl}/api/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filme por ID:", error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
//Avaliações

//==>COMENTÁRIOS

// usuário específico
export async function getComentarios(
  filmeId: number,
  usuarioId: number
): Promise<AvaliacaoFrontend | null> {
  try {
    const token = getToken();
    const response = await axios.get<AvaliacaoFrontend>(
      `${baseUrl}/api/nota/${filmeId}/minha-avaliacao`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar avaliação do usuário ${usuarioId} para o filme ${filmeId}:`,
      error
    );
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
//Avaliações

//==>NOTAS ESTRELAS

// epecifico Notas Estrelas
export async function getNotasEstrelas(
  filmeId: string
): Promise<AvaliacaoFrontend | null> {
  try {
    const token = getToken();
    const response = await axios.get<AvaliacaoFrontend>(
      `${baseUrl}/api/${filmeId}/minha-avaliacao`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar a avaliação do usuário para o filme:",
      error
    );
    return null;
  }
}

// deletar nota / estrelas
export async function deletarNotasEstrelas(filmeId: string): Promise<void> {
  try {
    const token = getToken();
    await axios.delete(`${baseUrl}/api/${filmeId}/nota`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao remover a avaliação do filme:", error);
    throw error;
  }
}

// inserir nota / estrelas
export async function avaliarFilme(
  filmeId: string,
  payload: AvaliarFilmePayload
): Promise<AvaliacaoFrontend> {
  try {
    const token = getToken();
    if (payload.nota < 1 || payload.nota > 5) {
      console.error("Erro ao avaliar o filme: Nota fora do intervalo válido (1-5)");
      throw new Error("A nota deve estar entre 1 e 5.");
    }
    const response = await axios.patch<AvaliacaoFrontend>(
      `${baseUrl}/api/nota/${filmeId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao avaliar o filme:", error);
    throw error;
  }
}