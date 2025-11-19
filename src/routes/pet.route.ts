import express from "express";
import petController from "../controllers/pet.controller"; 
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:id_pet", auth.jwtAuthMiddleware, petController.getPet); 
router.get("/", auth.jwtAuthMiddleware, petController.getPets);
router.post("/", auth.jwtAuthMiddleware, petController.createPet);
router.put("/:id_pet", auth.jwtAuthMiddleware, petController.updatePet);
router.delete("/:id_pet", auth.jwtAuthMiddleware, petController.deletePet);

export default router;