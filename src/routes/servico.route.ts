import express from "express";
import servicoController from "../controllers/servico.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id_servico", auth.jwtAuthMiddleware, servicoController.getServico);
router.get("/", auth.jwtAuthMiddleware, servicoController.getServicos);
router.post("/", auth.jwtAuthMiddleware, servicoController.createServico);
router.put("/:id_servico", auth.jwtAuthMiddleware, servicoController.updateServico);
router.delete("/:id_servico", auth.jwtAuthMiddleware, servicoController.deleteServico);

export default router;