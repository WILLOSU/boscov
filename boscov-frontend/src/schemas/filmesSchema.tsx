import { z } from "zod";

export const filmesSchema = z.object({
  nome: z
    .string()
    .nonempty({ message: "O título não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O nome do Filme não pode ter apenas espaços",
    }),
  poster: z
    .string()
    .nonempty({ message: "O link do banner não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O link do poster não pode ter apenas espaços",
    }),
  sinopse: z
    .string()
    .nonempty({ message: "O texto não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "A sinopse não pode ter apenas espaços",
    }),
});