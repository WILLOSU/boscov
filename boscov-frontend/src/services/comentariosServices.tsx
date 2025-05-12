import axios from "axios";
import { getToken } from "./filmesServices"; 
import type { ComentarioFrontend } from "../components/Interface/Types"; 
import  { baseUrl }  from '../utils/apiConfig';



// Buscar comentário de um usuário específico para um filme
export async function getComentario(
  filmeId: number,
  usuarioId: number
): Promise<ComentarioFrontend | null> {
  try {
    const token = getToken();
    const response = await axios.get<ComentarioFrontend>(
      `${baseUrl}/api/comentarios/${filmeId}/usuario`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar comentário do usuário ${usuarioId} para o filme ${filmeId}:`,
      error
    );
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

// Adicionar um novo comentário
export async function adicionarComentario(
  filmeId: number,
  comentario: string
): Promise<ComentarioFrontend> {
  try {
    const token = getToken();
    const response = await axios.post<ComentarioFrontend>(
      `${baseUrl}/api/comentarios`,
      {
        filmeId,
        comentario,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    throw error;
  }
}

// Editar um comentário existente
export async function editarComentario(
  comentarioId: string,
  payload: { comentario: string }
): Promise<ComentarioFrontend> {
  try {
    const token = getToken();
    const response = await axios.put<ComentarioFrontend>(
      `${baseUrl}/api/comentarios/${comentarioId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    throw error;
  }
}

// Excluir um comentário
export async function excluirComentario(comentarioId: string): Promise<void> {
  try {
    const token = getToken();
    await axios.delete(`${baseUrl}/api/comentarios/${comentarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao excluir comentário:", error);
    throw error;
  }
}

// Listar todos os comentários de um filme
export async function listarComentariosFilme(
  filmeId: number
): Promise<ComentarioFrontend[]> {
  try {
    const response = await axios.get<ComentarioFrontend[]>(
      `${baseUrl}/api/comentarios/filme/${filmeId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar comentários do filme ${filmeId}:`, error);
    throw error;
  }
}

// Listar todos os comentários de um usuário
export async function listarComentariosUsuario(
  usuarioId: number
): Promise<ComentarioFrontend[]> {
  try {
    const token = getToken();
    const response = await axios.get<ComentarioFrontend[]>(
      `${baseUrl}/api/comentarios/usuario/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar comentários do usuário ${usuarioId}:`, error);
    throw error;
  }
}
