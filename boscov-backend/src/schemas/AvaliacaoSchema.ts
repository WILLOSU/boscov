import { z } from "zod";

export const avaliacaoSchema = z.object({
  filmeId: z.union([z.number(), z.string().transform((val) => Number(val))]),
  nota: z.union([
    z.number().min(0).max(5),
    z.string().transform((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error("A nota deve ser um número válido");
      }
      return num;
    }),
  ]),
  comentario: z.string().optional(),
});
