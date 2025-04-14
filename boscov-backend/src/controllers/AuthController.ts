import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/AuthService';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Busca o usuário no banco de dados
      const user = await loginService(email);

      if (!user) {
        console.log("Usuário não encontrado");
        res.status(404).json({ message: 'Usuário ou senha inválidos' });
        return;
      }

      // Verifica a senha comparando o hash armazenado com a senha fornecida
      const passwordIsValid = await bcrypt.compare(password, user.senha);

      if (!passwordIsValid) {
        console.log("Senha inválida");
        res.status(404).json({ message: 'Usuário ou senha inválidos' });
        return;
      }

      // Se a senha for válida, gera o token
      const token = generateToken(user.id);

      // Remover a senha do objeto de resposta
      const { senha, ...userWithoutPassword } = user;

      // Retorna o token e os dados do usuário sem a senha
      res.status(200).json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  }
}
