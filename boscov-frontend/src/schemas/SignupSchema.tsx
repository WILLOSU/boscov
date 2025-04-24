import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
      .transform((name) =>
        name // pega o nome
          .trim() // remove espaço do início e final
          .split(" ") // separa usando espaço
          .map((word) => word[0].toUpperCase() + word.slice(1)) // cria um map,
          .join(" ")
      ), // cria um map, criando letra maíuscula

    email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),

    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),

    confirmPassword: z
      .string()
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

// usando o refine para pegar o data o password e verifica se o password é igual ao confirmPassword

export default signupSchema;
