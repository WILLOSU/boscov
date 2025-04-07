import { Router } from 'express';
import { GeneroController } from '../controllers/GeneroController';

const router = Router();
const generoController = new GeneroController();

router.get('/', generoController.getAll);
router.get('/:id', generoController.getById);
router.post('/', generoController.create);
router.put('/:id', generoController.update);
router.patch('/:id/desativar', generoController.desativar);
router.patch('/:id/reativar', generoController.reativar);

export default router;
