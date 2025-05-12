import axios from "axios";
import { getToken } from "./filmesServices";
import type { AvaliacaoFrontend } from "../components/Interface/Types";

const baseUrl: string = "http://localhost:3000";
//const baseUrl = "https://renderboscov.onrender.com";

// Cache para armazenar temporariamente médias e contagens de avaliações
interface CacheItem {
  valor: number;
  timestamp: number;
}

const cacheMedias: Record<string, CacheItem> = {};
const cacheTotais: Record<string, CacheItem> = {};
const cacheAvaliacoes: Record<
  string,
  { data: AvaliacaoFrontend[]; timestamp: number }
> = {};
const CACHE_DURATION = 60000; // 60 segundos em milissegundos

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

    // Invalidar cache após adicionar/atualizar avaliação
    invalidarCacheFilme(filmeId);

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

// Função para listar todas as avaliações de um filme com cache
// Função para listar todas as avaliações de um filme com cache
export async function listarAvaliacoesFilme(
  filmeId: string | number
): Promise<AvaliacaoFrontend[]> {
  const cacheKey = `filme-${filmeId}-avaliacoes`;
  const now = Date.now();

  // Verificar se temos avaliações em cache válidas
  if (
    cacheAvaliacoes[cacheKey] &&
    now - cacheAvaliacoes[cacheKey].timestamp < CACHE_DURATION
  ) {
    return cacheAvaliacoes[cacheKey].data;
  }

  try {
    // Usando a rota correta do backend: /:id/avaliacoes
    const response = await axios.get<{
      avaliacoes: AvaliacaoFrontend[];
      estatisticas: {
        totalAvaliacoes: number;
        mediaNotas: number;
        mediaEstrelas: number;
      };
    }>(`${baseUrl}/api/${filmeId}/avaliacoes`);

    // Verificar se os dados recebidos contêm a propriedade 'avaliacoes' e se ela é um array
    if (!response.data || !Array.isArray(response.data.avaliacoes)) {
      console.error(
        "A resposta da API não contém um array de avaliações:",
        response.data
      );
      return [];
    }

    // Armazenar em cache o array de avaliações (response.data.avaliacoes)
    cacheAvaliacoes[cacheKey] = {
      data: response.data.avaliacoes,
      timestamp: now,
    };

    return response.data.avaliacoes;
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

// Função para calcular a média das avaliações de um filme com cache
// Função para calcular a média das avaliações de um filme com cache
export async function calcularMediaAvaliacoes(
  filmeId: string | number
): Promise<number> {
  const cacheKey = `filme-${filmeId}-media`;
  const now = Date.now();

  // Verificar se temos uma média em cache válida
  if (
    cacheMedias[cacheKey] &&
    now - cacheMedias[cacheKey].timestamp < CACHE_DURATION
  ) {
    return cacheMedias[cacheKey].valor;
  }

  try {
    const avaliacoes = await listarAvaliacoesFilme(filmeId);

    // Verificar se avaliacoes é um array e não está vazio
    if (!Array.isArray(avaliacoes) || avaliacoes.length === 0) return 0;

    // Certificar que todas as notas são números
    const soma = avaliacoes.reduce((acc, avaliacao) => {
      // Garantir que a nota é um número
      const nota =
        typeof avaliacao.nota === "number"
          ? avaliacao.nota
          : Number(avaliacao.nota);
      return isNaN(nota) ? acc : acc + nota;
    }, 0);

    const media = Number.parseFloat((soma / avaliacoes.length).toFixed(1));

    // Armazenar em cache
    cacheMedias[cacheKey] = {
      valor: media,
      timestamp: now,
    };

    return media;
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

// Função para obter o total de avaliações de um filme com cache
export async function obterTotalAvaliacoes(
  filmeId: string | number
): Promise<number> {
  const cacheKey = `filme-${filmeId}-total`;
  const now = Date.now();

  // Verificar se temos um total em cache válido
  if (
    cacheTotais[cacheKey] &&
    now - cacheTotais[cacheKey].timestamp < CACHE_DURATION
  ) {
    return cacheTotais[cacheKey].valor;
  }

  try {
    const avaliacoes = await listarAvaliacoesFilme(filmeId);
    const total = avaliacoes.length;

    // Armazenar em cache
    cacheTotais[cacheKey] = {
      valor: total,
      timestamp: now,
    };

    return total;
  } catch (error) {
    console.error(
      `Erro ao obter total de avaliações do filme ${filmeId}:`,
      error
    );
    return 0;
  }
}

// Função para buscar média e total em uma única chamada (otimização)
export async function buscarEstatisticasAvaliacao(
  filmeId: string | number
): Promise<{ media: number; total: number }> {
  try {
    // Buscar as avaliações uma única vez e calcular tanto a média quanto o total
    const avaliacoes = await listarAvaliacoesFilme(filmeId);

    // Verificar se avaliacoes é um array
    if (!Array.isArray(avaliacoes)) {
      console.error("Avaliações não é um array válido:", avaliacoes);
      return { media: 0, total: 0 };
    }

    const total = avaliacoes.length;

    let media = 0;
    if (total > 0) {
      const soma = avaliacoes.reduce((acc, avaliacao) => {
        // Garantir que a nota é um número
        const nota =
          typeof avaliacao.nota === "number"
            ? avaliacao.nota
            : Number(avaliacao.nota);
        return isNaN(nota) ? acc : acc + nota;
      }, 0);

      media = Number.parseFloat((soma / total).toFixed(1));
    }

    // Armazenar ambos em cache
    const now = Date.now();
    const cacheKeyMedia = `filme-${filmeId}-media`;
    const cacheKeyTotal = `filme-${filmeId}-total`;

    cacheMedias[cacheKeyMedia] = {
      valor: media,
      timestamp: now,
    };

    cacheTotais[cacheKeyTotal] = {
      valor: total,
      timestamp: now,
    };

    return { media, total };
  } catch (error) {
    console.error(`Erro ao buscar estatísticas do filme ${filmeId}:`, error);
    return { media: 0, total: 0 };
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

// Função para criar uma nova nota (usando o NotaController)
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

    // Invalidar cache após criar nota
    invalidarCacheFilme(filmeId);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    throw error;
  }
}

export async function editarAvaliacao(
  avaliacaoId: string,
  payload: { nota: number; filmeId?: number | string }
): Promise<AvaliacaoFrontend> {
  try {
    const token = getToken();

    // Garantir que nota seja um número
    const notaNumber = Number(payload.nota);

    if (isNaN(notaNumber)) {
      throw new Error("A nota deve ser um número válido.");
    }

    const updatedPayload = {
      nota: notaNumber,
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

    // Invalidar cache após editar avaliação
    if (payload.filmeId) {
      invalidarCacheFilme(payload.filmeId);
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao editar avaliação:", error);
    throw error;
  }
}

// Função para invalidar o cache de um filme específico
function invalidarCacheFilme(filmeId: string | number): void {
  const cacheKeyMedia = `filme-${filmeId}-media`;
  const cacheKeyTotal = `filme-${filmeId}-total`;
  const cacheKeyAvaliacoes = `filme-${filmeId}-avaliacoes`;

  // Remover entradas do cache
  delete cacheMedias[cacheKeyMedia];
  delete cacheTotais[cacheKeyTotal];
  delete cacheAvaliacoes[cacheKeyAvaliacoes];

  console.log(`Cache invalidado para o filme ${filmeId}`);
}
