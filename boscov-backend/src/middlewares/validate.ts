import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// Middleware para validar o corpo da requisição usando Zod
export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Valida o corpo da requisição com o schema do Zod
      schema.parse(req.body);
      next(); // Se válido, vai para o próximo middleware ou controlador
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de ZodError
      if (err instanceof ZodError) {
        // Se for erro do Zod, retorna uma resposta 400 com detalhes do erro
        res.status(400).json({
          error: 'Erro de validação',
          details: err.errors, // Detalhes dos erros de validação
        });
      } else {
        // Se for outro tipo de erro, passa para o próximo middleware de erro
        next(err);
      }
    }
  };
