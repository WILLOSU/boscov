import { verifyToken } from "../middlewares/AuthMiddleware"
import { validate } from "../middlewares/Validate"
import { filmeSchema } from "../schemas/FilmeSchema"
import { FilmeController } from "../controllers/FilmeController"
import { avaliacaoSchema } from "../schemas/AvaliacaoSchema"
import { comentarioSchema } from "../schemas/ComentarioSchema"
import { ComentarioController } from "../controllers/ComentariosController"
import { NotaController } from "../controllers/NotasController"
import { notaSchema } from "../schemas/NotasSchema"

import { Router } from "express"

const router = Router()
const filmeController = new FilmeController()
const comentarioController = new ComentarioController()
const notaController = new NotaController()

// Rotas de filmes
router.get("/posts", filmeController.getAll)
router.get("/top", filmeController.getTopFilme)
router.get("/search", filmeController.findBySearch)
router.get("/:id", filmeController.getById)
router.get("/byUserId/:id", filmeController.findPostsByUserId)
router.post("/", verifyToken, validate(filmeSchema), filmeController.createFilmes)
router.put("/:id", validate(filmeSchema), filmeController.editFilmes)
router.delete("/:id", filmeController.deleteFilmes)
router.patch("/:id/desativar", filmeController.deleteFilmes)
router.patch("/:id/restaurar", filmeController.restoreFilmes)

// Rotas para avaliações de filmes (notas) - FilmeController
router.patch("/nota/:id", verifyToken, validate(avaliacaoSchema), filmeController.avaliarFilme)
router.get("/:id/avaliacoes", filmeController.getAvaliacoesFilme)
router.get("/:id/minha-avaliacao", verifyToken, filmeController.getAvaliacaoUsuario)

// Rotas para comentários
router.post("/comentarios", verifyToken, validate(comentarioSchema), comentarioController.createComentario)
router.get("/comentarios/:id", verifyToken, comentarioController.getComentarioById)
router.put("/comentarios/:id", verifyToken, validate(comentarioSchema), comentarioController.updateComentario)
router.delete("/comentarios/:id", verifyToken, comentarioController.deleteComentario)
router.get("/comentarios/filme/:filmeId", comentarioController.getComentariosFilme)
router.get("/comentarios/usuario/:usuarioId", verifyToken, comentarioController.getComentariosUsuario)
router.get("/comentarios/:filmeId/usuario", verifyToken, comentarioController.getComentarioUsuario)

// Novas rotas para notas usando NotaController
router.post("/notas", verifyToken, validate(notaSchema), notaController.createNota)
router.get("/notas/:id", notaController.getNotaById)
router.get("/notas/filme/:filmeId", notaController.getNotasFilme)
router.get("/notas/usuario/:usuarioId", notaController.getNotasUsuario)
router.get("/notas/:filmeId/usuario", verifyToken, notaController.getNotaUsuario)
router.get("/notas/:filmeId/verificar", verifyToken, notaController.verificarAvaliacao)

export default router
