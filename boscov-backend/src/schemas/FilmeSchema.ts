// schemas/FilmeSchema.ts
import { z } from 'zod';

export const filmeSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  diretor: z.string().min(1, 'Diretor é obrigatório'),
  ano: z.number().int().gte(1900).lte(new Date().getFullYear()),
  genero: z.string().min(1),
});
