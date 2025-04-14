// UserServices.ts
import { prisma } from './PrismaService';

const userService = {
  createUser: async (data: any) => {
    return await prisma.usuario.create({ data });
  },

  getAllUsers: async () => {
    return await prisma.usuario.findMany();
  },

  getUserById: async (id: number) => {
    return await prisma.usuario.findUnique({ where: { id } });
  },

  findByIdService: async (id: number) => {
    return await prisma.usuario.findUnique({ where: { id } });
  },

  updateUser: async (id: number, data: any) => {
    return await prisma.usuario.update({
      where: { id },
      data,
    });
  },

  deleteUser: async (id: number) => {
    return await prisma.usuario.delete({ where: { id } });
  },
};

export default userService; // Exporte como padrão
