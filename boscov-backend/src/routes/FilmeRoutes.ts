import { Router } from 'express';
import { FilmeController } from '../controllers/FilmeController';

const router = Router();
const filmeController = new FilmeController();

// Mesma estrutura das rotas de usuário
router.get('/', filmeController.getAll);
router.get('/:id', filmeController.getById);
router.post('/', filmeController.create);
router.put('/:id', filmeController.update);
router.delete('/:id', filmeController.delete);
router.patch('/:id/desativar', filmeController.delete);
router.patch('/:id/restaurar', filmeController.restore);


export default router;
