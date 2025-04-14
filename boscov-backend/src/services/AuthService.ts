import  prisma  from '../prisma/Client';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/JwtConfig';

// Busca o usuário no banco pelo email
export const loginService = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email },
  });
};

// Gera o token JWT
export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

// 1º JWT usando a assinatura MD5  = jwtSecret
// 2º é o dado do usuário é o ID   = userID. (posso passar mais)
// 3º OPTIONS  tempo para expirar  = jwtSecret 