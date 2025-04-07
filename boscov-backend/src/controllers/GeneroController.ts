import { Request, Response } from 'express';
import { prisma } from '../services/PrismaService';

export class GeneroController {
  // Buscar todos os gêneros (ativos)
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const generos = await prisma.genero.findMany({
        where: { status: true }
      });
      res.status(200).json(generos);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
  }

  // Buscar gênero por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const genero = await prisma.genero.findUnique({ where: { id } });

      if (!genero) {
        res.status(404).json({ error: 'Gênero não encontrado' });
        return;
      }

      res.status(200).json(genero);
    } catch (error) {
      console.error('Erro ao buscar gênero:', error);
      res.status(500).json({ error: 'Erro ao buscar gênero' });
    }
  }

  // Criar um novo gênero
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { descricao } = req.body;

      const genero = await prisma.genero.create({
        data: { descricao },
      });

      res.status(201).json(genero);
    } catch (error) {
      console.error('Erro ao criar gênero:', error);
      res.status(500).json({ error: 'Erro ao criar gênero' });
    }
  }

  // Atualizar um gênero
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { descricao } = req.body;

      const genero = await prisma.genero.update({
        where: { id },
        data: { descricao },
      });

      res.status(200).json(genero);
    } catch (error) {
      console.error('Erro ao atualizar gênero:', error);
      res.status(500).json({ error: 'Erro ao atualizar gênero' });
    }
  }

  // Desativar (inativar) um gênero
  async desativar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const genero = await prisma.genero.update({
        where: { id },
        data: { status: false },
      });

      res.status(200).json({ message: 'Gênero desativado com sucesso', genero });
    } catch (error) {
      console.error('Erro ao desativar gênero:', error);
      res.status(500).json({ error: 'Erro ao desativar gênero' });
    }
  }

  // Reativar um gênero
  async reativar(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const genero = await prisma.genero.update({
        where: { id },
        data: { status: true },
      });

      res.status(200).json({ message: 'Gênero reativado com sucesso', genero });
    } catch (error) {
      console.error('Erro ao reativar gênero:', error);
      res.status(500).json({ error: 'Erro ao reativar gênero' });
    }
  }
}
