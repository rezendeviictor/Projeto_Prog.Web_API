import express from "express"
import userWithTypeormController from "../controllers/userWithTypeorm.controller";
import auth from "../middlewares/auth.middleware"

const route = express.Router()

route.get("/:username",auth.jwtAuthMiddleware,userWithTypeormController.getUserByUsername);
route.get("/",auth.jwtAuthMiddleware,userWithTypeormController.getUsers);
route.post("/",userWithTypeormController.createUser);

export default route;