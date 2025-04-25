import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from "../middlewares/Validate";
import { usuarioSchema } from "../schemas/UsuarioSchema";
import { verifyToken } from '../middlewares/AuthMiddleware';

const router = Router();
const userController = new UserController();

// Rota pública (cadastro de usuário)
router.post('/', validate(usuarioSchema), userController.create);

// Middleware de autenticação aplicado a todas as rotas abaixo
router.use(verifyToken);


// Rotas protegidas
router.get('/getById', verifyToken, userController.getLoggedInUser);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/restaurar', userController.restore);

export default router;