import { verifyToken } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/Validate';
import { filmeSchema } from '../schemas/FilmeSchema';
import { FilmeController } from "../controllers/FilmeController"
import { avaliacaoSchema } from "../schemas/AvaliacaoSchema"

import { Router } from 'express';

const router = Router()
const filmeController = new FilmeController()


// As rotas de filmes que utilizam o middleware de autenticação
router.get('/posts', filmeController.getAll);
router.get('/top', filmeController.getTopFilme);
router.get('/search', filmeController.findBySearch);
router.get('/:id', filmeController.getById);

//router.post('/', verifyToken, validate(filmeSchema), filmeController.create);
//router.put('/:id', validate(filmeSchema), filmeController.update);
//router.delete('/:id', filmeController.delete);
//router.patch('/:id/desativar', filmeController.delete);
//router.patch('/:id/restaurar', filmeController.restore);


// Rotas para avaliações de filmes
router.patch("/nota/:id", verifyToken, validate(avaliacaoSchema), filmeController.avaliarFilme)
//router.delete("/:id/nota", verifyToken, filmeController.removerAvaliacao)
//router.get("/:id/avaliacoes", filmeController.getAvaliacoesFilme)
//router.get("/:id/minha-avaliacao", verifyToken, filmeController.getAvaliacaoUsuario)

export default router;