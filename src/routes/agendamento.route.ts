import express from "express";
import agendamentoController from "../controllers/agendamento.controller";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id_agendamento", auth.jwtAuthMiddleware, agendamentoController.getAgendamento);
router.get("/", auth.jwtAuthMiddleware, agendamentoController.getAgendamentos);
router.post("/", auth.jwtAuthMiddleware, agendamentoController.createAgendamento);
router.put("/:id_agendamento", auth.jwtAuthMiddleware, agendamentoController.updateAgendamento);
router.delete("/:id_agendamento", auth.jwtAuthMiddleware, agendamentoController.deleteAgendamento);

export default router;