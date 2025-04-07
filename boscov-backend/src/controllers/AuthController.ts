import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/JwtConfig';

const userMock = {
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('123456', 8),
};

export class AuthController {
  static login(req: Request, res: Response): void {
    const { username, password } = req.body;

    if (username !== userMock.username) {
      res.status(401).json({ message: 'Usuário não encontrado' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(password, userMock.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Senha inválida' });
      return;
    }

    const token = jwt.sign({ id: userMock.id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.status(200).json({
      message: 'Autenticado com sucesso',
      token,
    });
  }
}
