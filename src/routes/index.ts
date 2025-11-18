import express from "express"
import userRoute from "./user.route"
import authRoute from "./auth.route"
import petRoute from "./pet.route" // Mudou
import servicoRoute from "./servico.route" // Novo
import agendamentoRoute from "./agendamento.route" // Novo

const route = express.Router();

route.use("/auth", authRoute);
route.use("/users", userRoute);
route.use("/pets", petRoute); // Mudou
route.use("/servicos", servicoRoute); // Novo
route.use("/agendamentos", agendamentoRoute); // Novo

export default route;