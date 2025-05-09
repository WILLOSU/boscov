import { z } from "zod"

// Schema simplificado apenas para comentários
export const comentarioSchema = z.object({
  comentario: z
    .string()
    .nonempty({ message: "O comentário não pode ser vazio" })
    .max(500, { message: "O comentário pode ter no máximo 500 caracteres" }),
})

export type ComentarioFormValues = z.infer<typeof comentarioSchema>

