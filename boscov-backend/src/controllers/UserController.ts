import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        where: { ativo: true }
      });
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user = await prisma.user.findFirst({
        where: { id, ativo: true }
      });

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        return;
      }

      const user = await prisma.user.create({
        data: { name, email, password },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { name, email } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });

      res.json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const user = await prisma.user.update({
        where: { id },
        data: { ativo: false },
      });

      res.status(200).json({ message: 'Usuário desativado com sucesso', user });
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
      res.status(500).json({ error: 'Erro ao desativar usuário' });
    }
  }

  async restore(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const user = await prisma.user.update({
        where: { id },
        data: { ativo: true },
      });

      res.status(200).json({ message: 'Usuário reativado com sucesso', user });
    } catch (error) {
      console.error('Erro ao reativar usuário:', error);
      res.status(500).json({ error: 'Erro ao reativar usuário' });
    }
  }
}
