import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validate } from "../middlewares/validate";
import { usuarioSchema } from "../schemas/UsuarioSchema";



const router = Router();
const controller = new UserController();

router.get('/test', controller.test);       // GET /users/test
router.get('/', controller.getAll);         // GET /users
router.get('/:id', controller.getById);     // GET /users/:id
router.post('/', controller.create);        // POST /users
router.put('/:id', controller.update);      // PUT /users/:id
router.delete('/:id', controller.delete);   // DELETE /users/:id
router.patch('/:id/restaurar', controller.restore); // PATCH /users/:id/restaurar

export default router;
