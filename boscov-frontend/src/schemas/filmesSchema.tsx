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
    .url({ message: "O poster deve ser uma URL válida" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O link do poster não pode ter apenas espaços",
    }),
  sinopse: z
    .string()
    .nonempty({ message: "O texto não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "A sinopse não pode ter apenas espaços",
    }),
  diretor: z
    .string()
    .nonempty({ message: "O nome do diretor não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O nome do diretor não pode ter apenas espaços",
    }),
  anoLancamento: z
    .string()
    .nonempty({ message: "O ano de lançamento não pode ser vazio" }),
  duracao: z.string().nonempty({ message: "A duração não pode ser vazia" }),
  produtora: z
    .string()
    .nonempty({ message: "O nome da produtora não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O nome da produtora não pode ter apenas espaços",
    }),
  classificacao: z
    .string()
    .nonempty({ message: "A classificação indicativa não pode ser vazia" }),
  generos: z.array(z.number()).optional().nullable(),
  status: z.string().nonempty({ message: "O status não pode ser vazio" }),
  usuarioCriador: z.string().optional(),
  generoDescricao: z.string().optional(),
});