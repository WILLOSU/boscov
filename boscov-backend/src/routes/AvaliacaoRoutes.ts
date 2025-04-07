import express from 'express';
import * as avaliacaoController from '../controllers/AvaliacaoController';
import { validate } from '../middlewares/validate';
import { avaliacaoSchema } from '../schemas/AvaliacaoSchema';

const router = express.Router();

// Aplicando o middleware de validação para criar e atualizar
router.post('/', validate(avaliacaoSchema), avaliacaoController.criar);
router.get('/', avaliacaoController.listar);
router.get('/:id', avaliacaoController.buscarPorId);
router.put('/:id', validate(avaliacaoSchema), avaliacaoController.atualizar);
router.delete('/:id', avaliacaoController.deletar);

// Essa rota provavelmente não recebe corpo, então não precisa de validação
router.get('/verificar', avaliacaoController.verificarAvaliacao);

export default router;
