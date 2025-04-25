import { Request, Response } from "express";
import { generateToken } from "../services/AuthService"; //
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Adicione essa interface para representar erros do Prisma
interface PrismaError {
  code?: string;
  meta?: {
    target?: string[];
    [key: string]: any;
  };
  message: string;
}

const prisma = new PrismaClient();

export class UserController {
  // GET /usuarios
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.usuario.findMany({
        where: { status: true },
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
          dataNascimento: true,
          dataCriacao: true,
          dataAtualizacao: true,
          status: true,
          tipousuario: true, // inclua apenas se necessário
        },
      });

      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  // GET /usuarios/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const user = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
          dataNascimento: true,
          dataCriacao: true,
          dataAtualizacao: true,
          status: true,
          tipousuario: true,
        },
      });

      if (!user || !user.status) {
        res.status(404).json({ error: "Usuário não encontrado ou inativo" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // GET /user/getById (para buscar o usuário logado)
  async getLoggedInUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;

      if (!userId) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }

      const user = await prisma.usuario.findUnique({
        where: { id: Number(userId), status: true },
        select: {
          id: true,
          nome: true,
          email: true,
          apelido: true,
          dataNascimento: true,
          dataCriacao: true,
          dataAtualizacao: true,
          status: true,
          tipousuario: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado ou inativo" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário logado:", error);
      res.status(500).json({ error: "Erro ao buscar usuário logado" });
    }
  }

  // POST /usuarios
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, senha, email } = req.body; // Removendo apelido, dataNascimento, tipoUsuarioId

      if (!nome || !senha || !email) {
        res.status(400).json({
          error: "Nome, email e senha são obrigatórios",
        });
        return;
      }

      // Criptografar senha
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Criar o usuário
      const user = await prisma.usuario.create({
        data: {
          nome,
          senha: senhaCriptografada,
          email,
          status: true,
          apelido: null,
          dataNascimento: null,
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
          tipousuario: { connect: { id: 1 } }, // Um tipo de usuário padrão, se necessário
        },
      });

      // Gerar o token JWT após a criação do usuário
      const token = generateToken(user.id);

      // Retornar o usuário e o token na resposta
      res.status(201).json({ user, token });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // PUT /usuarios/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const { nome, senha, email, apelido, dataNascimento, tipoUsuarioId } =
        req.body;

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          nome,
          senha,
          email,
          apelido,
          ...(dataNascimento && { dataNascimento: new Date(dataNascimento) }),
          dataAtualizacao: new Date(),
          ...(tipoUsuarioId && { tipoUsuarioId: Number(tipoUsuarioId) }),
        },
      });

      res.json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  // DELETE /usuarios/:id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          status: false,
          dataAtualizacao: new Date(),
        },
      });

      res.status(200).json({ message: "Usuário desativado com sucesso", user });
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
      res.status(500).json({ error: "Erro ao desativar usuário" });
    }
  }

  // PATCH /usuarios/:id/restaurar
  async restore(req: Request, res: Response): Promise<void> {
    try {
      // tente fazer alguma coisa
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          status: true,
          dataAtualizacao: new Date(),
        },
      });

      res.status(200).json({ message: "Usuário reativado com sucesso", user });
    } catch (error) {
      // se não der mostra o erro !!
      console.error("Erro ao reativar usuário:", error);
      res.status(500).json({ error: "Erro ao reativar usuário" });
    }
  }
}