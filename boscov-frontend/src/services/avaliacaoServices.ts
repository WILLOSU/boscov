import axios from "axios";
import { getToken } from "./filmesServices";
import type { AvaliacaoFrontend } from "../components/Interface/Types";

const baseUrl: string = "http://localhost:3000";
//const baseUrl = "https://renderboscov.onrender.com";

// Função para buscar a avaliação do usuário atual para um filme específico
export async function getAvaliacao(
  filmeId: number | string
): Promise<AvaliacaoFrontend | null> {
  try {
    const token = getToken();
    // Usando a rota correta do backend: /:id/minha-avaliacao
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
    console.error("Erro ao buscar avaliação:", error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

// Função para adicionar ou atualizar uma avaliação
export async function adicionarAvaliacao(
  filmeId: number | string,
  nota: number
): Promise<AvaliacaoFrontend> {
  try {
    const token = getToken();

    // Validação da nota
    if (nota < 0 || nota > 5) {
      throw new Error("A nota deve estar entre 0 e 5.");
    }

    // Convertendo filmeId para número se for string
    const filmeIdNumber =
      typeof filmeId === "string" ? Number.parseInt(filmeId, 10) : filmeId;

    // Garantir que nota seja enviada como número
    const notaNumber = Number(nota);
    
    if (isNaN(notaNumber)) {
      throw new Error("A nota deve ser um número válido.");
    }

    // Payload formatado conforme esperado pelo backend
    const payload = {
      filmeId: filmeIdNumber,
      nota: notaNumber, // Garantir que seja número
    };

    console.log("Enviando payload:", payload);

    // Usando a rota correta do backend: /nota/:id ou /notas
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
    console.error("Erro ao adicionar avaliação:", error);
    throw error;
  }
}

// Função para verificar se o usuário já avaliou um filme
export async function verificarAvaliacaoExistente(
  filmeId: string | number
): Promise<boolean> {
  try {
    const token = getToken();
    // Usando a rota específica para verificar avaliação: /notas/:filmeId/verificar
    const response = await axios.get<{ exists: boolean }>(
      `${baseUrl}/api/notas/${filmeId}/verificar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.exists;
  } catch (error) {
    console.error("Erro ao verificar avaliação existente:", error);
    return false;
  }
}

// Função para listar todas as avaliações de um filme
export async function listarAvaliacoesFilme(
  filmeId: string | number
): Promise<AvaliacaoFrontend[]> {
  try {
    // Usando a rota correta do backend: /:id/avaliacoes
    const response = await axios.get<AvaliacaoFrontend[]>(
      `${baseUrl}/api/${filmeId}/avaliacoes`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar avaliações do filme ${filmeId}:`, error);
    return [];
  }
}

// Função alternativa para listar avaliações usando o NotaController
export async function listarNotasFilme(
  filmeId: string | number
): Promise<AvaliacaoFrontend[]> {
  try {
    // Usando a rota do NotaController: /notas/filme/:filmeId
    const response = await axios.get<AvaliacaoFrontend[]>(
      `${baseUrl}/api/notas/filme/${filmeId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar notas do filme ${filmeId}:`, error);
    return [];
  }
}

// Função para calcular a média das avaliações de um filme
export async function calcularMediaAvaliacoes(
  filmeId: string | number
): Promise<number> {
  try {
    const avaliacoes = await listarAvaliacoesFilme(filmeId);
    if (avaliacoes.length === 0) return 0;

    const soma = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0);
    return Number.parseFloat((soma / avaliacoes.length).toFixed(1));
  } catch (error) {
    console.error("Erro ao calcular média das avaliações:", error);
    return 0;
  }
}

// Função para obter avaliações de um usuário
export async function listarAvaliacoesUsuario(
  usuarioId: number
): Promise<AvaliacaoFrontend[]> {
  try {
    const token = getToken();
    // Usando a rota do NotaController: /notas/usuario/:usuarioId
    const response = await axios.get<AvaliacaoFrontend[]>(
      `${baseUrl}/api/notas/usuario/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar avaliações do usuário ${usuarioId}:`, error);
    return [];
  }
}

// Função para obter o total de avaliações de um filme
export async function obterTotalAvaliacoes(
  filmeId: string | number
): Promise<number> {
  try {
    const avaliacoes = await listarAvaliacoesFilme(filmeId);
    return avaliacoes.length;
  } catch (error) {
    console.error(
      `Erro ao obter total de avaliações do filme ${filmeId}:`,
      error
    );
    return 0;
  }
}

// Função para obter uma avaliação específica pelo ID
export async function getNotaPorId(
  notaId: string | number
): Promise<AvaliacaoFrontend | null> {
  try {
    // Usando a rota do NotaController: /notas/:id
    const response = await axios.get<AvaliacaoFrontend>(
      `${baseUrl}/api/notas/${notaId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar nota com ID ${notaId}:`, error);
    return null;
  }
}

/// Função para criar uma nova nota (usando o NotaController)
export async function criarNota(
  filmeId: number | string,
  nota: number
): Promise<AvaliacaoFrontend> {
  try {
    const token = getToken();

    // Convertendo filmeId para número se for string
    const filmeIdNumber =
      typeof filmeId === "string" ? Number.parseInt(filmeId, 10) : filmeId;

    // Garantir que nota seja enviada como número
    const notaNumber = Number(nota);
    
    if (isNaN(notaNumber)) {
      throw new Error("A nota deve ser um número válido.");
    }

    // Payload formatado conforme esperado pelo backend
    const payload = {
      filmeId: filmeIdNumber,
      nota: notaNumber, // Garantir que seja número
    };

    console.log("Enviando payload para criar nota:", payload);

    // Usando a rota do NotaController: /notas
    const response = await axios.post<AvaliacaoFrontend>(
      `${baseUrl}/api/notas`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    throw error;
  }
}

export async function editarAvaliacao(
  avaliacaoId: string,
  payload: { nota: number }
): Promise<AvaliacaoFrontend> {
  try {
    const token = getToken();
    
    // Garantir que nota seja um número
    const notaNumber = Number(payload.nota);
    
    if (isNaN(notaNumber)) {
      throw new Error("A nota deve ser um número válido.");
    }

    const updatedPayload = {
      nota: notaNumber
    };

    console.log("Enviando payload para editar avaliação:", updatedPayload);

    // Usando a mesma rota de adicionar, já que o backend usa PATCH para atualizar
    const response = await axios.patch<AvaliacaoFrontend>(
      `${baseUrl}/api/nota/${avaliacaoId}`,
      updatedPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao editar avaliação:", error);
    throw error;
  }
}