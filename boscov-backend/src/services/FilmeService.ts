// src/services/FilmeService.ts
import { prisma } from "./PrismaService";

// CRUD

// CREATE


export const getAllFilmes = async (limit: number = 4, offset: number = 0) => {
  return await prisma.filme.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      id: "desc",
    },
    include: {
      genero_filme: {
        include: {
          genero: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      },
    },
  });
};

export const countFilmes = async () => {
  return await prisma.filme.count();
};

export const topFilme = async () => {
  const filmes = await prisma.filme.findMany({
    include: {
      avaliacao: true,
      genero_filme: {
        include: {
          genero: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      },
    },
  });

  if (!filmes.length) return null;

  return filmes
    .map((filme) => {
      const totalNotas = filme.avaliacao.reduce((somaNotas, avaliacaoAtual) => {
        // Verifica se a nota é nula e usa 0 como valor padrão se for
        return somaNotas + (avaliacaoAtual.nota ?? 0);
      }, 0);

      const mediaNotas =
        filme.avaliacao.length > 0 ? totalNotas / filme.avaliacao.length : 0;

      return {
        ...filme,
        media: mediaNotas,
      };
    })
    .sort((filmeA, filmeB) => filmeB.media - filmeA.media)[0];
};

export const getFilmeById = async (id: number) => {
  return await prisma.filme.findUnique({
    where: { id },
    include: {
      genero_filme: {
        include: {
          genero: true, // Inclui os dados completos do gênero
        },
      },
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
  });
};

export const getAllGeneros = async () => {
  return await prisma.genero.findMany();
};

//  CRUD

export const createFilme = async (data: any) => {
  const { generos: generoIds, ...filmeData } = data; // Espera um array 'generos' com os IDs

  const filmeCriado = await prisma.filme.create({
    data: {
      ...filmeData,
      anoLancamento: Number(filmeData.anoLancamento),
      duracao: Number(filmeData.duracao),
      usuarioCriador: Number(filmeData.usuarioCriador),
      status: filmeData.status,
      genero_filme: {
        // Indica que vamos criar registros na tabela de relacionamento
        createMany: {
          data: generoIds.map((idGenero: number) => ({
            idGenero: Number(idGenero),
          })),
        },
      },
    },
    include: {
      genero_filme: {
        include: {
          genero: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      },
    },
  });

  return filmeCriado;
};

export const updateFilme = async (id: number, data: any) => {
  const { generos: generoIds, ...filmeData } = data;

  await prisma.filme.update({
    where: { id },
    data: {
      ...filmeData,
      anoLancamento: Number(filmeData.anoLancamento),
      duracao: Number(filmeData.duracao),
      usuarioCriador: Number(filmeData.usuarioCriador),
      dataAtualizacao: new Date(),
    },
  });

  // Atualiza os gêneros (remover os existentes e adicionar os novos)
  await prisma.genero_filme.deleteMany({
    where: { idFilme: id },
  });

  if (generoIds && Array.isArray(generoIds)) {
    await Promise.all(
      generoIds.map((idGenero: number) =>
        prisma.genero_filme.create({
          data: {
            idFilme: id,
            idGenero,
          },
        })
      )
    );
  }

  // Busca novamente o filme atualizado, incluindo os gêneros
  const filmeAtualizadoComGeneros = await prisma.filme.findUnique({
    where: { id },
    include: {
      genero_filme: {
        include: {
          genero: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      },
    },
  });

  return filmeAtualizadoComGeneros;
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
      },
    },
  });
};
// Buscar filmes pelo nome com paginação
export const findFilmesByNome = async (
  nome: string,
  limit: number = 4,
  offset: number = 0
) => {
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
      nome: "asc",
    },
    include: {
      genero_filme: {
        include: {
          genero: {
            select: {
              id: true,
              descricao: true,
            },
          },
        },
      },
    },
  });
};




// Criar nova avaliação
export const createAvaliacao = async (
  idUsuario: number,
  idFilme: number,
  nota: number | null,
  comentario?: string
) => {
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
  });
};

// Atualizar avaliação existente
export const updateAvaliacao = async (id: number, nota: number | null, comentario?: string) => {
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


// Buscar avaliação por usuário e filme
export const getAvaliacaoByUserAndFilme = async (
  idUsuario: number,
  idFilme: number
) => {
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
  });
};

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
  });
};



// Função para buscar filmes criados por um usuário específico
export async function findPostsByUserIdService(userId: number) {
  try {
    const filmes = await prisma.filme.findMany({
      where: {
        usuarioCriador: userId,
        status: true,
      },
      include: {
        genero_filme: {
          include: {
            genero: {
              select: {
                id: true,
                descricao: true,
              },
            },
          },
        },
      },
      orderBy: {
        dataAtualizacao: "desc",
      },
    });

    return filmes;
  } catch (error) {
    console.error("Erro ao buscar filmes do usuário:", error);
    throw error;
  }
}

// Buscar um comentário específico por ID
export async function getComentarioByIdService(comentarioId: number) {
  try {
    // Assumindo que você está usando Prisma ou algum ORM similar
    const comentario = await prisma.avaliacao.findUnique({
      where: {
        id: comentarioId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            // Outros campos do usuário que você queira incluir
          },
        },
      },
    });

    return comentario;
  } catch (error) {
    console.error("Erro ao buscar comentário por ID:", error);
    throw error;
  }
}


export async function updateComentarioService(comentarioId: number, nota: number | null, comentario: string | null) {
  try {
    // Atualizar o comentário no banco de dados
    const comentarioAtualizado = await prisma.avaliacao.update({
      where: {
        id: comentarioId,
      },
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
          },
        },
      },
    })

    return comentarioAtualizado
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error)
    throw error
  }
}



// NOTAS
export const calcularMediaAvaliacoesFilme = async (idFilme: number) => {
  const avaliacoes = await prisma.avaliacao.findMany({
    where: { idFilme },
    select: { nota: true },
  });

  if (avaliacoes.length === 0) {
    return 0;
  }

  const somaNotas = avaliacoes.reduce(
    (sum, avaliacao) => sum + (avaliacao.nota ?? 0),
    0
  );

  return somaNotas / avaliacoes.length;
};

// Função para validar a nota do filme
export const validarNotaFilme = (nota: number): boolean => {
  if (nota === null) return false;
  return nota >= 1 && nota <= 5;
};

// Função para converter a nota para estrelas (com granularidade de quartos)
export const converterNotaParaEstrelasQuartos = (
  nota: number | null,
  maxEstrelas = 5
): number => {
  if (nota === null || !validarNotaFilme(nota)) {
    console.warn(`A nota ${nota} está fora do intervalo válido (1 - 5).`);
    return 0;
  }
  return nota;
};