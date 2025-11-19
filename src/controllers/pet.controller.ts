import { Request, Response } from "express";
import Pet from "../models/pet.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Pet);

async function getPet(req: Request, res: Response) {

    const id = Number(req.params.id_pet); 
    const pet = await repository.findOneBy({"id_pet": id});

    if (pet == null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); 
        return;
    }

    res.status(200).json(pet);
}

async function getPets(req: Request, res: Response) {

    const pets = await repository.find();
    res.status(200).json(pets);
}

async function createPet(req: Request, res: Response) {

    const petData = req.body as Pet;
    const pet = repository.create(petData); 
    const savedPet = await repository.save(pet); 

    res.status(201).json(savedPet);
}

async function updatePet(req: Request, res: Response) {

    const id = Number(req.params.id_pet);
    const petData = req.body as Pet;
    
    const existedPet = await repository.findOneBy({'id_pet': id});

    if (existedPet === null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); 
        return;
    }


    repository.merge(existedPet, petData);
    const savedPet = await repository.save(existedPet);

    res.status(200).json(savedPet);
}

async function deletePet(req: Request, res: Response) {

    const id = Number(req.params.id_pet);
    const result = await repository.delete({"id_pet":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); 
        return;
    }

    res.sendStatus(204); 
}

export default {
    getPet,
    getPets,
    createPet,
    updatePet,
    deletePet
}