// src/services/FilmeService.ts
import { prisma } from './PrismaService';

export const getAllFilmes = async (limit: number = 4, offset: number = 0) => {
  // Aqui mantemos a implementação do Prisma para paginação
  return await prisma.filme.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      id: 'desc' // do último postado
    }
  });
};

export const countFilmes = async () => {
  return await prisma.filme.count();
};

export const topFilme = async () => {
  const filmes = await prisma.filme.findMany({
    include: {
      avaliacao: true,
      genero: true
    }
  });

  if (!filmes.length) return null;

  // Calcula a média das avaliações de cada filme e retorna o que tiver a maior média
  return filmes
    .map(filme => {
      const totalNotas = filme.avaliacao.reduce((somaNotas, avaliacaoAtual) => {
        return somaNotas + avaliacaoAtual.nota;
      }, 0);
  
      const mediaNotas = filme.avaliacao.length > 0
        ? totalNotas / filme.avaliacao.length
        : 0;
  
      return {
        ...filme,
        media: mediaNotas
      };
    })
    .sort((filmeA, filmeB) => filmeB.media - filmeA.media)[0]; // Retorna o filme com a maior média
  
};

export const getFilmeById = async (id: number) => {
  return await prisma.filme.findUnique({
    where: { id },
    include: {
      genero: true,
      avaliacao: {
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              apelido: true,
            },
          },
        },
      },
    },
  }) // busca no bd usar await
}

export const createFilme = async (data: any) => {
  return await prisma.filme.create({ data })
}


export const updateFilme = async (id: number, data: any) => {
  return await prisma.filme.update({
    where: { id },
    data,
  });
};

export const deleteFilme = async (id: number) => {
  return await prisma.filme.update({
    where: { id },
    data: {
      status: false,
      dataAtualizacao: new Date(),
    },
  });
};

export const restoreFilme = async (id: number) => {
  return await prisma.filme.update({
    where: { id },
    data: {
      status: true,
      dataAtualizacao: new Date(),
    },
  });
};

  // Contar filmes pelo nome
  export const countFilmesByNome = async (nome: string) => {
    return await prisma.filme.count({
      where: {
        nome: {
          contains: nome.toLowerCase(),
          //mode: 'insensitive'
        }
      }
    });
  };
// Buscar filmes pelo nome com paginação
export const findFilmesByNome = async (nome: string, limit: number = 4, offset: number = 0) => {
  return await prisma.filme.findMany({
    where: {
      nome: {
        contains: nome.toLowerCase(),
       // mode: 'insensitive'
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      nome: 'asc'
    },
  })
}

// Funções para avaliações de filmes

// Função para validar a nota do filme
export const validarNotaFilme = (nota: number): boolean => {
  return nota >= 1 && nota <= 10
}

// Função para converter a nota para estrelas (com granularidade de quartos)
export const converterNotaParaEstrelasQuartos = (nota: number, maxEstrelas = 5): number => {
  if (!validarNotaFilme(nota)) {
    console.warn(`A nota ${nota} está fora do intervalo válido (1 - 10).`)
    return 0
  }

  const escalaQuartosEstrelas = ((nota - 1) * (maxEstrelas * 4)) / 9
  const quartosArredondados = Math.round(escalaQuartosEstrelas) / 4
  return Math.min(maxEstrelas, Math.max(0, quartosArredondados))
}

// Criar nova avaliação
export const createAvaliacao = async (idUsuario: number, idFilme: number, nota: number, comentario?: string) => {
  return await prisma.avaliacao.create({
    data: {
      idUsuario,
      idFilme,
      nota,
      comentario,
    },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
        },
      },
    },
  })
}

// Atualizar avaliação existente
export const updateAvaliacao = async (id: number, nota: number, comentario?: string) => {
  return await prisma.avaliacao.update({
    where: { id },
    data: {
      nota,
      comentario,
    },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
        },
      },
    },
  })
}

// FUTURO

// Remover avaliação
export const deleteAvaliacao = async (id: number) => {
  return await prisma.avaliacao.delete({
    where: { id },
  })
}

// Buscar avaliação por usuário e filme
export const getAvaliacaoByUserAndFilme = async (idUsuario: number, idFilme: number) => {
  return await prisma.avaliacao.findFirst({
    where: {
      idUsuario,
      idFilme,
    },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
        },
      },
    },
  })
}

// Buscar todas as avaliações de um filme
export const getAvaliacoesByFilmeId = async (idFilme: number) => {
  return await prisma.avaliacao.findMany({
    where: { idFilme },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  })
}

// Calcular média de avaliações de um filme
export const calcularMediaAvaliacoesFilme = async (idFilme: number) => {
  const avaliacoes = await prisma.avaliacao.findMany({
    where: { idFilme },
    select: { nota: true },
  })

  if (avaliacoes.length === 0) {
    return 0
  }

  const somaNotas = avaliacoes.reduce((sum, avaliacao) => sum + avaliacao.nota, 0)
  return somaNotas / avaliacoes.length
}

// Função para buscar filmes criados por um usuário específico

export async function findPostsByUserIdService(userId: number) {
  try {
    const filmes = await prisma.filme.findMany({
      where: {
        usuarioCriador: userId,
        status: true,
      },
      select: {
        id: true,
        nome: true,
        diretor: true,
        anoLancamento: true,
        duracao: true,
        produtora: true,
        classificacao: true,
        poster: true,
        sinopse: true,
        dataAtualizacao: true,
        genero: {   // Mantém a relação completa do gênero
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      orderBy: {
        dataAtualizacao: 'desc',
      },
    });

    // Retorna os filmes com o objeto completo do gênero
    return filmes;
  } catch (error) {
    console.error("Erro ao buscar filmes do usuário:", error);
    throw error;
  }
}


