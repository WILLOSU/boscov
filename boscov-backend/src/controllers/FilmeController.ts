import { Request, Response } from 'express';
import {
  getAllFilmes,
  getFilmeById,
  createFilme,
  updateFilme,
  deleteFilme,
  restoreFilme
} from '../services/FilmeService';

export class FilmeController {
  // Buscar todos os filmes
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filmes = await getAllFilmes();
      res.status(200).json(filmes);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
  }

  // Buscar filme por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const filme = await getFilmeById(id);

      if (!filme) {
        res.status(404).json({ error: 'Filme não encontrado' });
        return;
      }

      res.status(200).json(filme);
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
      res.status(500).json({ error: 'Erro ao buscar filme' });
    }
  }

  // Criar um novo filme
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const filme = await createFilme(data);

      res.status(201).json(filme);
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      res.status(500).json({ error: 'Erro ao criar filme' });
    }
  }

  // Atualizar um filme
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const filme = await updateFilme(id, data);
      res.status(200).json(filme);
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
      res.status(500).json({ error: 'Erro ao atualizar filme' });
    }
  }

  // Desativar (soft delete) um filme
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await deleteFilme(id);
      res.status(200).json({ message: 'Filme desativado com sucesso' });
    } catch (error) {
      console.error('Erro ao desativar filme:', error);
      res.status(500).json({ error: 'Erro ao desativar filme' });
    }
  }

  // Reativar um filme
  async restore(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await restoreFilme(id);
      res.status(200).json({ message: 'Filme reativado com sucesso' });
    } catch (error) {
      console.error('Erro ao reativar filme:', error);
      res.status(500).json({ error: 'Erro ao reativar filme' });
    }
  }
}
