import axios from "axios";
import Cookies from "js-cookie";
import { Filme } from "../Datas"; // Importe o tipo Filme do seu arquivo Datas
import { FilmesData } from "../components/Interface/Types";

const baseUrl: string = "http://localhost:3000";
//const baseUrl = "https://renderboscov.onrender.com";


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

export const searchFilmes = async (titulo: string, limit: number = 1000, offset: number = 0) => {
  const url = `${baseUrl}/api/search`;
  return await axios.get(url, {
    params: { nome: titulo, limit, offset }
  });
};


export async function getAllPostsByUser(userId: number): Promise<Filme[]> {
  try {
    if (!userId) {
      throw new Error("ID do usuário não fornecido");
    }

    // URL CORRETA: /api/byUserId/{userId} - não inclui "filmes"
    const response = await axios.get<Filme[]>(`${baseUrl}/api/byUserId/${userId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    return [];
  }
}

// CRUD COM PERFEIÇÃO !!

// Função para criar filme
export async function createFilmes(filmesData: FilmesData) {
  const response = await axios.post(`${baseUrl}/api/create`, filmesData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}


// Função para buscar filme por ID com tipagem
export async function getFilmesById(id: string) {
  const response = await axios.get<FilmesData>(`${baseUrl}/api/byIdPost/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

// Função para atualizar filme
export async function updateFilme(id: string, filmesData: FilmesData) {
  const response = await axios.patch(`${baseUrl}/api/${id}`, filmesData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}


// Função para excluir filme
export async function deleteFilme(id: string) {
  const response = await axios.delete(`${baseUrl}/api/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

// Função para desativar filme 
export async function desativarFilme(id: string) {
  const response = await axios.patch(`${baseUrl}/api/${id}/desativar`, {}, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

// Função para restaurar filme
export async function restaurarFilme(id: string) {
  const response = await axios.patch(`${baseUrl}/api/${id}/restaurar`, {}, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}