import axios from "axios";
import { getToken } from "./filmesServices";
import type { NotaFrontend, EstatisticasAvaliacao } from "../components/Interface/Types";

const baseUrl: string = "http://localhost:3000";
//const baseUrl = "https://renderboscov.onrender.com";

/**
 * Verifica se o usuário já avaliou um filme específico
 * @param filmeId ID do filme a verificar
 * @returns true se o usuário já avaliou o filme, false caso contrário
 */
export async function verificarAvaliacao(filmeId: number): Promise<boolean> {
  try {
    const token = getToken();
    const response = await axios.get<{ jaAvaliou: boolean }>(
      `${baseUrl}/api/notas/${filmeId}/verificar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.jaAvaliou;
  } catch (error) {
    console.error(
      `Erro ao verificar avaliação para o filme ${filmeId}:`,
      error
    );
    return false;
  }
}

/**
 * Busca a nota de um usuário para um filme específico
 * @param filmeId ID do filme
 * @returns Objeto NotaFrontend ou null se não encontrado
 */
export async function getNota(filmeId: number): Promise<NotaFrontend | null> {
  try {
    const token = getToken();
    const response = await axios.get<NotaFrontend>(
      `${baseUrl}/api/notas/${filmeId}/usuario`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar nota para o filme ${filmeId}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Adiciona uma nova nota para um filme
 * @param filmeId ID do filme a ser avaliado
 * @param nota Valor da nota (0-5)
 * @returns Objeto NotaFrontend com a nota criada
 */
export async function adicionarNota(
  filmeId: number,
  nota: number
): Promise<NotaFrontend> {
  try {
    const token = getToken();

    const response = await axios.post<NotaFrontend>(
      `${baseUrl}/api/notas`,
      {
        filmeId,
        nota,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar nota:", error);
    throw error;
  }
}

/**
 * Obtém uma nota específica pelo ID
 * @param notaId ID da nota a buscar
 * @returns Objeto NotaFrontend com os dados da nota
 */
export async function getNotaById(notaId: number): Promise<NotaFrontend> {
  try {
    const response = await axios.get<NotaFrontend>(
      `${baseUrl}/api/notas/${notaId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar nota com ID ${notaId}:`, error);
    throw error;
  }
}

/**
 * Lista todas as notas de um filme
 * @param filmeId ID do filme
 * @returns Array de objetos NotaFrontend
 */
export async function listarNotasFilme(
  filmeId: number
): Promise<NotaFrontend[]> {
  try {
    const response = await axios.get<NotaFrontend[]>(
      `${baseUrl}/api/notas/filme/${filmeId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar notas do filme ${filmeId}:`, error);
    return [];
  }
}

/**
 * Lista todas as notas de um usuário
 * @param usuarioId ID do usuário
 * @returns Array de objetos NotaFrontend
 */
export async function listarNotasUsuario(
  usuarioId: number
): Promise<NotaFrontend[]> {
  try {
    const token = getToken();
    const response = await axios.get<NotaFrontend[]>(
      `${baseUrl}/api/notas/usuario/${usuarioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar notas do usuário ${usuarioId}:`, error);
    return [];
  }
}

/**
 * Obtém estatísticas de avaliação para um filme
 * @param filmeId ID do filme
 * @returns Objeto com estatísticas de avaliação
 */
export async function obterEstatisticasAvaliacao(
  filmeId: number
): Promise<EstatisticasAvaliacao> {
  try {
    const notas = await listarNotasFilme(filmeId);

    // Valor padrão se não houver notas
    if (notas.length === 0) {
      return {
        media: 0,
        total: 0,
        distribuicao: {},
      };
    }

    // Calcular média
    const soma = notas.reduce((acc, nota) => acc + nota.nota, 0);
    const media = Number.parseFloat((soma / notas.length).toFixed(1));

    // Calcular distribuição
    const distribuicao: Record<number, number> = {};

    // Inicializar todas as possíveis notas com 0
    for (let i = 0; i <= 5; i += 0.5) {
      distribuicao[i] = 0;
    }

    // Contar as ocorrências de cada nota
    notas.forEach((nota) => {
      distribuicao[nota.nota] = (distribuicao[nota.nota] || 0) + 1;
    });

    return {
      media,
      total: notas.length,
      distribuicao,
    };
  } catch (error) {
    console.error(
      `Erro ao obter estatísticas de avaliação do filme ${filmeId}:`,
      error
    );
    return {
      media: 0,
      total: 0,
      distribuicao: {},
    };
  }
}
