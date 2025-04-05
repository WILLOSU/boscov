import prisma from '../prisma/Client';

export const createUser = async (data: any) => {
  return await prisma.user.create({ data });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
