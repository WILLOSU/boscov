import { prisma } from './PrismaService';


export const createUser = async (data: any) => {
  return await prisma.usuario.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.usuario.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.usuario.findUnique({ where: { id } });
};

export const updateUser = async (id: number, data: any) => {
  return await prisma.usuario.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.usuario.delete({ where: { id } });
};
