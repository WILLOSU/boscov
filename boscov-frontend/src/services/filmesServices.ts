import axios from "axios"; // axios vai lá na api e busca os dados

const baseUrl: string = "http://localhost:3000";

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
