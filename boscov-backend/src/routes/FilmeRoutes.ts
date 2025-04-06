
import { Router, Request, Response } from 'express';
import { FilmeController } from '../controllers/FilmeController';

const router = Router();
const filmeController = new FilmeController();

router.get('/filmes', async (req: Request, res: Response) => {
  await filmeController.getAll(req, res);
});

export default router;
