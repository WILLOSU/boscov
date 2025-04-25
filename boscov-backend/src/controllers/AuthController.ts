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

      // Defina o token como um cookie
      res.cookie('token', token, {
        httpOnly: true, // O cookie só pode ser acessado pelo servidor
        secure: process.env.NODE_ENV === 'production', // Envie apenas por HTTPS em produção
        sameSite: 'strict', // Proteção contra ataques CSRF
        maxAge: 24 * 60 * 60 * 1000, // Tempo de vida do cookie (1 dia)
      });

      // Remover a senha do objeto de resposta
      const { senha, ...userWithoutPassword } = user;

      // Retorna o token e os dados do usuário sem a senha
      res.status(200).json({
        token, // Envia o token também no corpo da resposta
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  }
}
