import { PrismaClient } from "@prisma/client";

interface ComentarioInput {
  filmeId: number;
  usuarioId: number;
  comentario: string;
}

interface ComentarioUpdateInput {
  comentario: string;
}

export class ComentarioService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Criar um novo comentário ou atualizar um existente
  async createComentario(data: ComentarioInput) {
    // Verificar se já existe uma avaliação para este usuário e filme
    const avaliacaoExistente = await this.prisma.avaliacao.findFirst({
      where: {
        idFilme: data.filmeId,
        idUsuario: data.usuarioId,
      },
    });

    if (avaliacaoExistente) {
      // Se já existe, apenas atualiza o comentário sem alterar a nota
      return this.prisma.avaliacao.update({
        where: { id: avaliacaoExistente.id },
        data: {
          comentario: data.comentario,
          // Não alteramos a nota aqui
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
      });
    } else {
      // Se não existe, cria uma nova avaliação apenas com comentário
      return this.prisma.avaliacao.create({
        data: {
          idFilme: data.filmeId,
          idUsuario: data.usuarioId,
          comentario: data.comentario,
          nota: null, // Não definimos nota ao criar um comentário
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
      });
    }
  }

  // Obter um comentário pelo ID
  async getComentarioById(id: number) {
    return this.prisma.avaliacao.findUnique({
      where: {
        id,
        NOT: {
          comentario: null,
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
    });
  }

  // Obter o comentário de um usuário para um filme específico
  async getComentarioUsuarioFilme(filmeId: number, usuarioId: number) {
    return this.prisma.avaliacao.findFirst({
      where: {
        idFilme: filmeId,
        idUsuario: usuarioId,
        NOT: {
          comentario: null,
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
    });
  }

  // Atualizar um comentário existente
  async updateComentario(id: number, data: ComentarioUpdateInput) {
    // Primeiro, verificamos se a avaliação existe e tem um comentário
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
    });

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada");
    }

    // Atualizamos apenas o comentário, mantendo a nota intacta
    return this.prisma.avaliacao.update({
      where: { id },
      data: {
        comentario: data.comentario,
        // Não alteramos a nota aqui
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
    });
  }

  // Excluir um comentário (apenas remove o comentário, não a avaliação inteira)
  async deleteComentario(id: number) {
    // Primeiro, verificamos se a avaliação existe e tem um comentário
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
    });

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada");
    }

    if (!avaliacao.comentario) {
      throw new Error("Esta avaliação não possui comentário");
    }

    // Se a avaliação tem uma nota, mantemos o registro e apenas removemos o comentário
    if (avaliacao.nota !== null) {
      return this.prisma.avaliacao.update({
        where: { id },
        data: {
          comentario: null,
          // Mantemos a nota intacta
        },
      });
    } else {
      // Se não tem nota, podemos excluir o registro inteiro
      return this.prisma.avaliacao.delete({
        where: { id },
      });
    }
  }

  // Listar todos os comentários de um filme
  async getComentariosFilme(filmeId: number) {
    return this.prisma.avaliacao.findMany({
      where: {
        idFilme: filmeId,
        NOT: {
          comentario: null,
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
    });
  }

  // Listar todos os comentários de um usuário
  async getComentariosUsuario(usuarioId: number) {
    return this.prisma.avaliacao.findMany({
      where: {
        idUsuario: usuarioId,
        NOT: {
          comentario: null,
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
    });
  }
}
