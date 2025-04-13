import { Request, Response } from 'express';
import { AvaliacaoService } from '../services/AvaliacaoService';

const service = new AvaliacaoService();

export const criar = async (req: Request, res: Response) => {
  try {
    const usuarioId = (req as any).userId;

    if (!usuarioId) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const novaAvaliacao = await service.criar({
      ...req.body,
      usuarioId,
    });

    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};



export const listar = async (_req: Request, res: Response) => {
  try {
    const avaliacoes = await service.listar();
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar avaliações' });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const avaliacao = await service.buscarPorId(id);

    if (avaliacao) {
      res.status(200).json(avaliacao);
    } else {
      res.status(404).json({ message: 'Avaliação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliação' });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const atualizada = await service.atualizar(id, req.body);
    res.status(200).json(atualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await service.deletar(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar avaliação' });
  }
};

export const verificarAvaliacao = async (req: Request, res: Response) => {
  try {
    const idUsuario = Number(req.query.usuario);
    const idFilme = Number(req.query.filme);

    const avaliacao = await service.verificarAvaliacao(idUsuario, idFilme);

    if (avaliacao) {
      res.status(200).json({ message: 'Usuário já avaliou este filme', avaliacao });
    } else {
      res.status(404).json({ message: 'Avaliação não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar avaliação' });
  }
};
