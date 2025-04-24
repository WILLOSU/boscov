import { z } from "zod";

const searchSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "A pesquisa não pode ser vazia" })
    .refine(value => !/^\s*$/.test(value), {
      message: "A pesquisa não pode conter apenas espaços",
    }),
});

export default searchSchema;
