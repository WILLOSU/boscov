import axios from "axios";
import Cookies from "js-cookie";
import { Filme } from "../Datas"; // Importe o tipo Filme do seu arquivo Datas

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

/*
export function createFilmes(body) {
  const response = axios.post(`${baseUrl}/api/create`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getFilmesById(id) {
  const response = axios.get(`${baseUrl}/api/byIdPost/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function editFilmes(body, id) {
  const response = axios.patch(`${baseUrl}/api/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteFilmes (id) {
  const response = axios.delete(`${baseUrl}/api/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
  */

