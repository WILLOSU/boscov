import { z } from "zod"

// Schema para validação de avaliações
export const avaliacaoSchema = z.object({
  nota: z
    .number({
      required_error: "A nota é obrigatória",
      invalid_type_error: "A nota deve ser um número",
    })
    .min(1, "A nota deve ser no mínimo 1")
    .max(5, "A nota deve ser no máximo 5")
    .transform(val => Number(val)), // Isso força a conversão para número
})


// Tipo derivado do schema
export type AvaliacaoFormValues = z.infer<typeof avaliacaoSchema>
