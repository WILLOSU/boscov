import { z } from 'zod';
export const avaliacaoSchema = z.object({
  filmeId: z.number(),
  nota: z.number().min(0).max(10),
  comentario: z.string().optional()
});
  