// schemas/FilmeSchema.ts
import { z } from 'zod';

export const filmeSchema = z.object({
  nome: z.string(),
  diretor: z.string(),
  anoLancamento: z.number().int(),
  duracao: z.number().int(),
  produtora: z.string(),
  classificacao: z.string(),
  poster: z.string().url().optional(),
  generoId: z.number().int(),
  sinopse: z.string().optional(),
  status: z.boolean().optional()
});
