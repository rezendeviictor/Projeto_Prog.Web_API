import express from "express"
import authController from "../controllers/auth.controller"
import auth from "../middlewares/auth.middleware"

const route = express.Router();

route.post("/login",authController.login);

export default route;