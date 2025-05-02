import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/JwtConfig';
import userService from '../services/UserServices';

// Tipagem correta para funções assíncronas em middlewares Express
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(403).json({ message: 'Token não fornecido' });
      return; // Apenas sai da função, não retorna o objeto res
    }
    
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(403).json({ message: 'Formato do token inválido' });
      return; // Apenas sai da função
    }

    const token = parts[1];

    const decoded = jwt.verify(token, jwtSecret) as { id: number };

    const user = await userService.findByIdService(decoded.id);

    if (!user || !user.id) {
      res.status(403).json({ message: 'Token inválido ou usuário não encontrado' });
      return; // Apenas sai da função
    }

    (req as any).userId = user.id;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
    // Não chama next() aqui porque já enviou uma resposta
  }
};