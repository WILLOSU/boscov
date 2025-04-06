import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FilmeController {
  async getAll(req: Request, res: Response) {
    try {
      const filmes = await prisma.filme.findMany({
        include: {
          generos: {
            include: {
              genero: true
            }
          }
        }
      });

      // Formatando para retornar só os dados úteis dos gêneros
      const filmesComGeneros = filmes.map(filme => ({
        ...filme,
        generos: filme.generos.map(gf => gf.genero.descricao)
      }));

      return res.status(200).json(filmesComGeneros);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
