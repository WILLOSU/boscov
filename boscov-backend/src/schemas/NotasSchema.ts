import { z } from "zod"

// Schema para validação de notas usando Zod
export const notaSchema = z.object({
  filmeId: z.number().int().positive(),
  nota: z.number().min(0).max(5).step(0.5), // Nota de 0 a 5, com incrementos de 0.5
})

// Tipos derivados do schema
export type NotaInput = z.infer<typeof notaSchema> & {
  usuarioId: number
}

export type NotaUpdateInput = {
  nota: number
}
