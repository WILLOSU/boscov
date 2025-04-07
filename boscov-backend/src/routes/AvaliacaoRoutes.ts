import express from 'express';
import * as avaliacaoController from '../controllers/AvaliacaoController';

const router = express.Router();

router.post('/', avaliacaoController.criar);
router.get('/', avaliacaoController.listar);
router.get('/:id', avaliacaoController.buscarPorId);
router.put('/:id', avaliacaoController.atualizar);
router.delete('/:id', avaliacaoController.deletar);


router.get('/verificar', avaliacaoController.verificarAvaliacao);

export default router;
