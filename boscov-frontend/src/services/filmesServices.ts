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

export function searchFilmes(titulo: string) {
  console.log("Base URL:", baseUrl);
  const url = `${baseUrl}/api/search?nome=${titulo}`; // <- CORRIGIDO AQUI
  console.log("URL da requisição:", url);

  return axios.get(url)
    .then(response => {
      console.log("Resposta:", response.status);
      return response;
    })
    .catch(error => {
      console.error("Erro no serviço searchFilmes:", error);
      throw error;
    });
}
