import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';



const router = Router();

//authenticação é feita através de post
router.post('/', AuthController.login);



export default router;

