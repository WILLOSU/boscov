import type { Request, Response } from "express";

import {
  getAllFilmes,
  countFilmes,
  getFilmeById,
  createFilme,
  updateFilme,
  deleteFilme,
  topFilme,
  countFilmesByNome,
  findFilmesByNome,
  restoreFilme,
  createAvaliacao,
  updateAvaliacao,
  getAvaliacaoByUserAndFilme,
  getAvaliacoesByFilmeId,
  calcularMediaAvaliacoesFilme,
  converterNotaParaEstrelasQuartos,
  findPostsByUserIdService,
  getAllGeneros,
  updateComentarioService,
  getComentarioByIdService,
} from "../services/FilmeService";

export class FilmeController {
  // Buscar todos os filmes com paginação
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset } = req.query;
      let numLimit = Number(limit);
      let numOffset = Number(offset);

      if (!numLimit) {
        numLimit = 4;
      }
      if (!numOffset) {
        numOffset = 0;
      }

      // Paginação
      const filmes = await getAllFilmes(numLimit, numOffset);
      const total = await countFilmes();
      const currentUrl = req.baseUrl;

      // Calcular próxima página
      const next = numOffset + numLimit;
      const nextUrl =
        next < total ? `${currentUrl}?limit=${numLimit}&offset=${next}` : null;

      // Calcular página anterior
      const previous = numOffset - numLimit < 0 ? null : numOffset - numLimit;
      const previousUrl =
        previous != null
          ? `${currentUrl}?limit=${numLimit}&offset=${previous}`
          : null;

      if (filmes.length === 0) {
        res.status(200).json({ message: "Não há filmes cadastrados" });
        return;
      }

      res.status(200).json({
        nextUrl,
        previousUrl,
        limit: numLimit,
        offset: numOffset,
        total,
        results: filmes,
      });
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      res.status(500).json({ error: "Erro ao buscar filmes" });
    }
  }

  // Melhor Nota Filme !!
  async getTopFilme(req: Request, res: Response): Promise<void> {
    try {
      const filme = await topFilme();

      if (!filme) {
        res.status(400).send({ message: "There is no registered movie" });
        return;
      }

      res.status(200).send(filme); // Retorna o filme completo com os gêneros incluídos
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Erro desconhecido" });
      }
    }
  }

  // Buscar filme por ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id); // desconstroíndo
      const filme = await getFilmeById(id);

      if (!filme) {
        res.status(404).json({ error: "Filme não encontrado" });
        return;
      }

      res.status(200).json(filme);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      res.status(500).json({ error: "Erro ao buscar filme" });
    }
  }

  // Criar um novo filme
  async createFilmes(req: Request, res: Response): Promise<void> {
    try {
      const {
        anoLancamento,
        duracao,
        status,
        usuarioCriador,
        generos,
        ...restOfBody
      } = req.body;

      const data = {
        ...restOfBody,
        anoLancamento: Number(anoLancamento),
        duracao: Number(duracao),
        usuarioCriador: Number(usuarioCriador),
        status: status,
        generos: generos, // Passa o array de gêneros para o service
      };
      console.log("Dados convertidos no controller:", data);
      const filme = await createFilme(data);
      res.status(201).json(filme);
    } catch (error) {
      console.error("Erro ao criar filme:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ error: "Erro interno do servidor", details: error.message });
      } else {
        res
          .status(500)
          .json({ error: "Erro interno do servidor", details: String(error) });
      }
    }
  }

  // Atualizar um filme
  async editFilmes(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const filme = await updateFilme(id, data);
      res.status(200).json(filme);
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      res.status(500).json({ error: "Erro ao atualizar filme" });
    }
  }

  // Desativar (soft delete) um filme
  async deleteFilmes(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await deleteFilme(id);
      res.status(200).json({ message: "Filme desativado com sucesso" });
    } catch (error) {
      console.error("Erro ao desativar filme:", error);
      res.status(500).json({ error: "Erro ao desativar filme" });
    }
  }

  // Reativar um filme
  async restoreFilmes(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await restoreFilme(id);
      res.status(200).json({ message: "Filme reativado com sucesso" });
    } catch (error) {
      console.error("Erro ao reativar filme:", error);
      res.status(500).json({ error: "Erro ao reativar filme" });
    }
  }

  // Pesquisando Filmes por Query String
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      console.log({ id });

      const filme = await getFilmeById(id);

      if (!filme) {
        res.status(404).json({ message: "Filme não encontrado" });
        return;
      }

      // Retorna o filme diretamente sem estrutura adicional
      res.status(200).json(filme);
    } catch (error) {
      console.error("Erro ao buscar filme por ID:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Erro desconhecido" });
      }
    }
  }

  // Método para adicionar ao FilmeController.ts
  async findBySearch(req: Request, res: Response): Promise<void> {
    try {
      // Extrair parâmetros da query
      const nome = (req.query.nome as string) || "";
      const limit = Number(req.query.limit) || 5;
      const offset = Number(req.query.offset) || 0;

      // Buscar total de filmes correspondentes ao filtro
      const total = await countFilmesByNome(nome);

      // Buscar filmes com o filtro aplicado
      const filmes = await findFilmesByNome(nome, limit, offset);

      // Construir URLs para paginação
      const currentUrl = req.baseUrl;
      const next = offset + limit;
      const nextUrl =
        next < total
          ? `${currentUrl}?nome=${nome}&limit=${limit}&offset=${next}`
          : null;

      const previous = offset - limit < 0 ? null : offset - limit;
      const previousUrl =
        previous !== null
          ? `${currentUrl}?nome=${nome}&limit=${limit}&offset=${previous}`
          : null;

      // Retornar resultados
      res.status(200).json({
        nextUrl,
        previousUrl,
        total,
        limit,
        offset,
        results: filmes,
      });
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro ao buscar filmes",
      });
    }
  }

  // Adicionar ou atualizar avaliação de um filme
  async avaliarFilme(req: Request, res: Response): Promise<void> {
    try {
      const idFilme = Number(req.params.id);
      const idUsuario = (req as any).userId; // ID do usuário autenticado
      const { nota, comentario } = req.body;

      // Verificar se o filme existe
      const filme = await getFilmeById(idFilme);
      if (!filme) {
        res.status(404).json({ message: "Filme não encontrado" });
        return;
      }

      // Verificar se o usuário já avaliou este filme
      const avaliacaoExistente = await getAvaliacaoByUserAndFilme(
        idUsuario,
        idFilme
      );

      let avaliacao;
      if (avaliacaoExistente) {
        // Atualizar avaliação existente
        avaliacao = await updateAvaliacao(
          avaliacaoExistente.id,
          nota as number | null, // Corrigido: Aceita null
          comentario
        );
        res.status(200).json({
          message: "Avaliação atualizada com sucesso",
          avaliacao: {
            ...avaliacao,
            estrelas:
              nota !== null
                ? converterNotaParaEstrelasQuartos(nota as number)
                : 0,
          },
        });
      } else {
        // Criar nova avaliação
        avaliacao = await createAvaliacao(
          idUsuario,
          idFilme,
          nota as number | null,
          comentario
        ); // Corrigido: Aceita null
        res.status(201).json({
          message: "Avaliação criada com sucesso",
          avaliacao: {
            ...avaliacao,
            estrelas:
              nota !== null
                ? converterNotaParaEstrelasQuartos(nota as number)
                : 0,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao avaliar filme:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  // Buscar todas as avaliações de um filme
  async getAvaliacoesFilme(req: Request, res: Response): Promise<void> {
    try {
      const idFilme = Number(req.params.id);

      // Verificar se o filme existe
      const filme = await getFilmeById(idFilme);
      if (!filme) {
        res.status(404).json({ message: "Filme não encontrado" });
        return;
      }

      // Buscar avaliações
      const avaliacoes = await getAvaliacoesByFilmeId(idFilme);

      // Calcular média das notas
      const mediaNotas = await calcularMediaAvaliacoesFilme(idFilme);

      // Converter para estrelas (escala de 5)
      const mediaEstrelas =
        mediaNotas > 0 ? converterNotaParaEstrelasQuartos(mediaNotas) : 0;

      res.status(200).json({
        avaliacoes: avaliacoes.map((avaliacao) => ({
          ...avaliacao,
          estrelas:
            avaliacao.nota !== null
              ? converterNotaParaEstrelasQuartos(avaliacao.nota)
              : 0,
        })),
        estatisticas: {
          totalAvaliacoes: avaliacoes.length,
          mediaNotas,
          mediaEstrelas,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  // Buscar a avaliação de um usuário específico para um filme
  async getAvaliacaoUsuario(req: Request, res: Response): Promise<void> {
    try {
      const idFilme = Number(req.params.id);
      const idUsuario = (req as any).userId;

      // Buscar avaliação do usuário
      const avaliacao = await getAvaliacaoByUserAndFilme(idUsuario, idFilme);

      if (!avaliacao) {
        res.status(404).json({ message: "Avaliação não encontrada" });
        return;
      }

      res.status(200).json({
        avaliacao: {
          ...avaliacao,
          estrelas:
            avaliacao.nota !== null
              ? converterNotaParaEstrelasQuartos(avaliacao.nota)
              : 0,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar avaliação do usuário:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  // Método para buscar filmes criados pelo usuário autenticado
  async findPostsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);

      // Validação básica
      if (isNaN(userId) || userId <= 0) {
        res.status(400).json({ message: "ID de usuário inválido" });
        return;
      }

      const posts = await findPostsByUserIdService(userId);
      console.log(
        "Dados recebidos do serviço (findPostsByUserIdService):",
        posts
      );
      if (!posts || posts.length === 0) {
        res
          .status(404)
          .json({ message: "Nenhum post encontrado para este usuário." });
        return;
      }

      res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts por usuário:", error);
      res.status(500).json({ message: "Erro interno ao buscar posts." });
    }
  }

  // Listar todos os gêneros
  async listAllGeneros(req: Request, res: Response): Promise<void> {
    try {
      // Aqui você chamará o serviço para buscar todos os gêneros
      const generos = await getAllGeneros(); // Assumindo que este método exista no seu FilmeService
      res.status(200).json(generos);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
      res.status(500).json({ error: "Erro ao buscar gêneros" });
    }
  }

  // Buscar um comentário específico por ID
  async getComentarioById(req: Request, res: Response): Promise<void> {
    try {
      const comentarioId = Number(req.params.id);

      // Verificar se o ID é válido
      if (isNaN(comentarioId) || comentarioId <= 0) {
        res.status(400).json({ message: "ID de comentário inválido" });
        return;
      }

      // Buscar o comentário no banco de dados
      const comentario = await getComentarioByIdService(comentarioId);

      if (!comentario) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      // Retornar o comentário
      res.status(200).json(comentario);
    } catch (error) {
      console.error("Erro ao buscar comentário por ID:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  // Atualizar um comentário específico
  async atualizarComentario(req: Request, res: Response): Promise<void> {
    try {
      const comentarioId = Number(req.params.id);
      const idUsuario = (req as any).userId; // ID do usuário autenticado
      const { nota, comentario } = req.body;

      // Verificar se o ID é válido
      if (isNaN(comentarioId) || comentarioId <= 0) {
        res.status(400).json({ message: "ID de comentário inválido" });
        return;
      }

      // Buscar o comentário para verificar se existe e se pertence ao usuário
      const comentarioExistente = await getComentarioByIdService(comentarioId);

      if (!comentarioExistente) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }

      // Verificar se o comentário pertence ao usuário que está tentando atualizá-lo
      if (comentarioExistente.idUsuario !== idUsuario) {
        res.status(403).json({
          message: "Você não tem permissão para atualizar este comentário",
        });
        return;
      }

      // Atualizar o comentário
      const comentarioAtualizado = await updateComentarioService(
        comentarioId,
        nota as number | null, // Corrigido: Aceita null
        comentario as string | null // Corrigido: Aceita null
      );

      res.status(200).json({
        message: "Comentário atualizado com sucesso",
        avaliacao: {
          ...comentarioAtualizado,
          estrelas:
            nota !== null
              ? converterNotaParaEstrelasQuartos(nota as number)
              : 0,
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }
}
