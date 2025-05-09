import type { Request, Response } from "express";
import { NotaService } from "../services/NotasServices";

// Defina uma interface estendida para Request
export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export class NotaController {
  private notaService: NotaService;

  constructor() {
    this.notaService = new NotaService();
  }

  // Criar uma nova nota
  createNota = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { filmeId, nota } = req.body;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      // Verificar se o usuário já avaliou este filme
      const jaAvaliou = await this.notaService.usuarioJaAvaliou(
        Number(filmeId),
        usuarioId
      );

      if (jaAvaliou) {
        res.status(400).json({
          message: "Você já avaliou este filme e não pode alterar sua nota",
        });
        return;
      }

      const novaNota = await this.notaService.createNota({
        filmeId,
        usuarioId,
        nota,
      });

      res.status(201).json(novaNota);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Obter uma nota específica pelo ID
  getNotaById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const nota = await this.notaService.getNotaById(Number.parseInt(id));

      if (!nota) {
        res.status(404).json({ message: "Nota não encontrada" });
        return;
      }

      res.status(200).json(nota);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Obter nota de um usuário para um filme específico
  getNotaUsuario = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { filmeId } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      const nota = await this.notaService.getNotaUsuarioFilme(
        Number.parseInt(filmeId),
        usuarioId
      );

      if (!nota) {
        res.status(404).json({ message: "Nota não encontrada" });
        return;
      }

      res.status(200).json(nota);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Atualizar uma nota existente (não permitido)
  updateNota = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      // Verificar se a nota existe
      const notaExistente = await this.notaService.getNotaById(
        Number.parseInt(id)
      );

      if (!notaExistente) {
        res.status(404).json({ message: "Nota não encontrada" });
        return;
      }

      if (notaExistente.idUsuario !== usuarioId) {
        res.status(403).json({
          message: "Você não tem permissão para editar esta nota",
        });
        return;
      }

      // Não permitimos atualizar notas
      res.status(403).json({
        message: "Não é permitido alterar a nota após a avaliação inicial",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Excluir uma nota (não permitido)
  deleteNota = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      // Verificar se a nota existe
      const nota = await this.notaService.getNotaById(Number.parseInt(id));

      if (!nota) {
        res.status(404).json({ message: "Nota não encontrada" });
        return;
      }

      if (nota.idUsuario !== usuarioId) {
        res.status(403).json({
          message: "Você não tem permissão para excluir esta nota",
        });
        return;
      }

      // Não permitimos excluir notas
      res.status(403).json({
        message: "Não é permitido excluir avaliações após serem registradas",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Listar todas as notas de um filme
  getNotasFilme = async (req: Request, res: Response): Promise<void> => {
    try {
      const { filmeId } = req.params;
      const notas = await this.notaService.getNotasFilme(
        Number.parseInt(filmeId)
      );

      res.status(200).json(notas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Listar todas as notas de um usuário
  getNotasUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuarioId } = req.params;
      const notas = await this.notaService.getNotasUsuario(
        Number.parseInt(usuarioId)
      );

      res.status(200).json(notas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Verificar se um usuário já avaliou um filme
  verificarAvaliacao = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { filmeId } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      const jaAvaliou = await this.notaService.usuarioJaAvaliou(
        Number.parseInt(filmeId),
        usuarioId
      );

      res.status(200).json({ jaAvaliou });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
