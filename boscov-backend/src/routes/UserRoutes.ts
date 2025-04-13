import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from "../middlewares/Validate";
import { usuarioSchema } from "../schemas/UsuarioSchema";

const router = Router();
const userController = new UserController();

// ✅ Agora as rotas estão no caminho direto após "/usuarios"
router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.post('/', validate(usuarioSchema), userController.create);

  
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/restaurar', userController.restore);



export default router;