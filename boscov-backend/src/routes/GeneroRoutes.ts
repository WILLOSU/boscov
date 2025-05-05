import { Router } from 'express';
import { GeneroController } from '../controllers/GeneroController';
import { FilmeController } from '../controllers/FilmeController';

const router = Router();
const generoController = new GeneroController();


const filmeController = new FilmeController();

router.get('/', generoController.getAll);
router.get('/:id', generoController.getById);
router.post('/', generoController.create);
router.put('/:id', generoController.update);
router.patch('/:id/desativar', generoController.desativar);
router.patch('/:id/reativar', generoController.reativar);


router.get('/', filmeController.listAllGeneros.bind(filmeController));

export default router;
