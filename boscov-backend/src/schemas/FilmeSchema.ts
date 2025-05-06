// schemas/FilmeSchema.ts
import { z } from 'zod';

export const filmeSchema = z.object({
  nome: z.string(),
  poster: z.string().url().optional(),
  sinopse: z.string().optional(),
  diretor: z.string(),
  anoLancamento: z.number().int(),
  duracao: z.number().int(),
  produtora: z.string(),
  classificacao: z.string(),
  generos: z.array(z.number().int()).optional(), 
  status: z.boolean().optional()
});
