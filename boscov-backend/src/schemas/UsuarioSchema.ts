import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const usuarioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  email: z.string()
    .regex(emailRegex, 'E-mail inválido, verifique o formato ex: nome@dominio.com'),
  apelido: z.string().optional(),
  dataNascimento: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data de nascimento inválida',
  }),
  tipoUsuarioId: z.number({ invalid_type_error: 'Tipo de usuário deve ser um número' }),
});
