// src/services/FilmeService.ts
import { prisma } from './PrismaService';

export const getAllFilmes = async (limit: number = 5, offset: number = 0) => {
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


export const getFilmeById = async (id: number) => {
  return await prisma.filme.findUnique({ where: { id } });
};

export const createFilme = async (data: any) => {
  return await prisma.filme.create({ data });
};

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
