import { PrismaClient } from "@prisma/client"

interface NotaInput {
  filmeId: number
  usuarioId: number
  nota: number // Nota como Float
}

interface NotaUpdateInput {
  nota: number // Nota como Float
}

export class NotaService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Criar uma nova avaliação - apenas se não existir
  async createNota(data: NotaInput) {
    // Verificar se já existe uma avaliação para este usuário e filme
    const avaliacaoExistente = await this.prisma.avaliacao.findFirst({
      where: {
        idFilme: data.filmeId,
        idUsuario: data.usuarioId,
      },
    })

    if (avaliacaoExistente) {
      // Se já existe uma avaliação, não permite criar outra
      throw new Error("Usuário já avaliou este filme e não pode alterar a nota")
    } else {
      // Se não existe, cria uma nova avaliação com nota
      return this.prisma.avaliacao.create({
        data: {
          idFilme: data.filmeId,
          idUsuario: data.usuarioId,
          nota: data.nota,
          comentario: null, // Mantemos null para compatibilidade
        },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              avatar: true,
            },
          },
          filme: {
            select: {
              id: true,
              nome: true,
              poster: true,
            },
          },
        },
      })
    }
  }

  // Obter uma avaliação pelo ID
  async getNotaById(id: number) {
    return this.prisma.avaliacao.findUnique({
      where: {
        id,
        NOT: {
          nota: null,
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            avatar: true,
          },
        },
        filme: {
          select: {
            id: true,
            nome: true,
            poster: true,
          },
        },
      },
    })
  }

  // Obter a avalia��ão de um usuário para um filme específico
  async getNotaUsuarioFilme(filmeId: number, usuarioId: number) {
    return this.prisma.avaliacao.findFirst({
      where: {
        idFilme: filmeId,
        idUsuario: usuarioId,
        NOT: {
          nota: null,
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            avatar: true,
          },
        },
        filme: {
          select: {
            id: true,
            nome: true,
            poster: true,
          },
        },
      },
    })
  }

  // Método de atualização não permite alterar a nota
  async updateNota(id: number, data: NotaUpdateInput) {
    // Primeiro, verificamos se a avaliação existe
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
    })

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada")
    }

    // Não permite atualizar a nota
    throw new Error("Não é permitido alterar a nota após a avaliação inicial")
  }

  // Excluir uma avaliação
  async deleteNota(id: number) {
    // Verificamos se a avaliação existe
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
    })

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada")
    }

    if (avaliacao.nota === null) {
      throw new Error("Esta avaliação não possui nota")
    }

    // Não permite excluir avaliações
    throw new Error("Não é permitido excluir avaliações após serem registradas")
  }

  // Listar todas as avaliações de um filme
  async getNotasFilme(filmeId: number) {
    return this.prisma.avaliacao.findMany({
      where: {
        idFilme: filmeId,
        NOT: {
          nota: null,
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        id: "desc", // Ordenação por ID decrescente
      },
    })
  }

  // Listar todas as avaliações de um usuário
  async getNotasUsuario(usuarioId: number) {
    return this.prisma.avaliacao.findMany({
      where: {
        idUsuario: usuarioId,
        NOT: {
          nota: null,
        },
      },
      include: {
        filme: {
          select: {
            id: true,
            nome: true,
            poster: true,
          },
        },
      },
      orderBy: {
        id: "desc", // Ordenação por ID decrescente
      },
    })
  }

  // Verificar se um usuário já avaliou um filme
  async usuarioJaAvaliou(filmeId: number, usuarioId: number): Promise<boolean> {
    const avaliacao = await this.prisma.avaliacao.findFirst({
      where: {
        idFilme: filmeId,
        idUsuario: usuarioId,
        NOT: {
          nota: null,
        },
      },
    })

    return avaliacao !== null
  }
}
