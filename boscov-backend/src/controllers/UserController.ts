import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserController {
  // GET /usuarios
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.usuario.findMany({
        where: { status: true },
        include: { tipoUsuario: true }
      });
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  // GET /usuarios/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const user = await prisma.usuario.findUnique({
        where: { id },
        include: { tipoUsuario: true }
      });

      if (!user || !user.status) {
        res.status(404).json({ error: 'Usuário não encontrado ou inativo' });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

 
  // POST /usuarios
async create(req: Request, res: Response): Promise<void> {
  try {
    const {
      nome,
      senha,
      email,
      apelido,
      dataNascimento,
      tipoUsuarioId
    } = req.body;

    if (!nome || !senha || !email || !tipoUsuarioId || !dataNascimento) {
      res.status(400).json({ error: 'Nome, email, senha, tipo de usuário e data de nascimento são obrigatórios' });
      return;
    }

    const tipoUsuarioExistente = await prisma.tipoUsuario.findUnique({
      where: { id: Number(tipoUsuarioId) },
    });

    if (!tipoUsuarioExistente) {
      res.status(400).json({ error: 'Tipo de usuário inválido ou inexistente' });
      return;
    }
    
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: {
        nome,
        senha: senhaCriptografada,
        email,
        status: true,
        apelido,
        dataNascimento: new Date(dataNascimento),
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
        tipoUsuarioId: Number(tipoUsuarioId)
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


  // PUT /usuarios/:id
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const {
        nome,
        senha,
        email,
        apelido,
        dataNascimento,
        tipoUsuarioId
      } = req.body;

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          nome,
          senha,
          email,
          apelido,
          ...(dataNascimento && { dataNascimento: new Date(dataNascimento) }),
          dataAtualizacao: new Date(),
          ...(tipoUsuarioId && { tipoUsuarioId: Number(tipoUsuarioId) })
        }
      });

      res.json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  // DELETE /usuarios/:id
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          status: false,
          dataAtualizacao: new Date()
        }
      });

      res.status(200).json({ message: 'Usuário desativado com sucesso', user });
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
      res.status(500).json({ error: 'Erro ao desativar usuário' });
    }
  }

  // PATCH /usuarios/:id/restaurar
  async restore(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const user = await prisma.usuario.update({
        where: { id },
        data: {
          status: true,
          dataAtualizacao: new Date()
        }
      });

      res.status(200).json({ message: 'Usuário reativado com sucesso', user });
    } catch (error) {
      console.error('Erro ao reativar usuário:', error);
      res.status(500).json({ error: 'Erro ao reativar usuário' });
    }
  }
}
