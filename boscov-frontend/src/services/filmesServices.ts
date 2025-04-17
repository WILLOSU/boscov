import axios from "axios"; // axios vai lá na api e busca os dados
const baseUrl: string = "http://localhost:3000";

export async function getAllFilmes() {
  try {
    console.log("Fazendo requisição para:", `${baseUrl}/api/posts`);
    const response = await axios.get(`${baseUrl}/api/posts`);
    console.log("Resposta recebida:", response);
    return response;
  } catch (error) {
    console.error("Detalhes do erro:", error);
    throw error;
  }
}
export async function getTopFilme() {
  try {
    console.log("Fazendo requisição para:", `${baseUrl}/api/top`);
    const response = await axios.get(`${baseUrl}/api/top`);
    console.log("Resposta recebida:", response);
    return response;
  } catch (error) {
    console.error("Detalhes do erro:", error);
    throw error;
  }
}
