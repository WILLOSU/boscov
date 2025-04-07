import prisma from '../prisma/Client';

export class AvaliacaoService {
  async criar(data: any) {
    return await prisma.avaliacao.create({ data });
  }

  async listar() {
    return await prisma.avaliacao.findMany({
      include: {
        usuario: true,
        filme: true,
      },
    });
  }

  async buscarPorId(id: number) {
    return await prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: true,
        filme: true,
      },
    });
  }

  async atualizar(id: number, data: any) {
    return await prisma.avaliacao.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    return await prisma.avaliacao.delete({
      where: { id },
    });
  }

  async verificarAvaliacao(idUsuario: number, idFilme: number) {
    return await prisma.avaliacao.findFirst({
      where: {
        idUsuario,
        idFilme,
      },
    });
  }
}



