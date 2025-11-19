import express from "express"
import userRoute from "./user.route"
import authRoute from "./auth.route"
import petRoute from "./pet.route" 
import servicoRoute from "./servico.route"
import agendamentoRoute from "./agendamento.route" 

const route = express.Router();

route.use("/auth", authRoute);
route.use("/users", userRoute);
route.use("/pets", petRoute); 
route.use("/servicos", servicoRoute); 
route.use("/agendamentos", agendamentoRoute); 

export default route;