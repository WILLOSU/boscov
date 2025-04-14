
import { verifyToken } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/Validate';
import { filmeSchema } from '../schemas/FilmeSchema';
import { FilmeController } from '../controllers/FilmeController';

import { Router } from 'express';



const router = Router();
const filmeController = new FilmeController();

// As rotas de filmes agora utilizam o middleware de autenticação
router.get('/', filmeController.getAll);
router.get('/:id', filmeController.getById);
router.post('/', verifyToken, validate(filmeSchema), filmeController.create);
router.put('/:id', validate(filmeSchema), filmeController.update);
router.delete('/:id', filmeController.delete);
router.patch('/:id/desativar', filmeController.delete);
router.patch('/:id/restaurar', filmeController.restore);

export default router;
