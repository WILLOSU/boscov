import type { Request, Response } from "express";
import { ComentarioService } from "../services/ComentariosServices";
import type { ComentarioInput } from "../schemas/ComentarioSchema";

// Defina uma interface estendida para Request
export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export class ComentarioController {
  private comentarioService: ComentarioService;

  constructor() {
    this.comentarioService = new ComentarioService();
  }

  // Criar um novo comentário
  createComentario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { filmeId, comentario } = req.body;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      const novoComentario = await this.comentarioService.createComentario({
        filmeId,
        usuarioId,
        comentario,
      });

      res.status(201).json(novoComentario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Obter um comentário específico pelo ID
  getComentarioById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const comentario = await this.comentarioService.getComentarioById(
        Number.parseInt(id)
      );

      if (!comentario) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      res.status(200).json(comentario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Obter comentário de um usuário para um filme específico
  getComentarioUsuario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { filmeId } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      const comentario = await this.comentarioService.getComentarioUsuarioFilme(
        Number.parseInt(filmeId),
        usuarioId
      );

      if (!comentario) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      res.status(200).json(comentario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Atualizar um comentário existente
  updateComentario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { comentario } = req.body as ComentarioInput;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      // Verificar se o comentário pertence ao usuário
      const comentarioExistente =
        await this.comentarioService.getComentarioById(Number.parseInt(id));

      if (!comentarioExistente) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      if (comentarioExistente.idUsuario !== usuarioId) {
        res.status(403).json({
          message: "Você não tem permissão para editar este comentário",
        });
        return;
      }

      const comentarioAtualizado =
        await this.comentarioService.updateComentario(Number.parseInt(id), {
          comentario,
        });

      res.status(200).json(comentarioAtualizado);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Excluir um comentário
  deleteComentario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const usuarioId = req.userId;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuário não autenticado" });
        return;
      }

      // Verificar se o comentário pertence ao usuário
      const comentario = await this.comentarioService.getComentarioById(
        Number.parseInt(id)
      );

      if (!comentario) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      if (comentario.idUsuario !== usuarioId) {
        res.status(403).json({
          message: "Você não tem permissão para excluir este comentário",
        });
        return;
      }

      await this.comentarioService.deleteComentario(Number.parseInt(id));

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Listar todos os comentários de um filme
  getComentariosFilme = async (req: Request, res: Response): Promise<void> => {
    try {
      const { filmeId } = req.params;
      const comentarios = await this.comentarioService.getComentariosFilme(
        Number.parseInt(filmeId)
      );

      res.status(200).json(comentarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Listar todos os comentários de um usuário
  getComentariosUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuarioId } = req.params;
      const comentarios = await this.comentarioService.getComentariosUsuario(
        Number.parseInt(usuarioId)
      );

      res.status(200).json(comentarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}