import { Request, Response } from "express";
import Servico from "../models/servico.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Servico);

async function getServico(req: Request, res: Response) {

    const id = Number(req.params.id_servico);
    const servico = await repository.findOneBy({"id_servico": id});

    if (servico == null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." }); 
        return;
    }

    res.status(200).json(servico);
}

async function getServicos(req: Request, res: Response) {

    const servicos = await repository.find();
    res.status(200).json(servicos);
}

async function createServico(req: Request, res: Response) {

    const servicoData = req.body as Servico;
    const servico = repository.create(servicoData);
    const savedServico = await repository.save(servico);

    res.status(201).json(savedServico);
}

async function updateServico(req: Request, res: Response) {

    const id = Number(req.params.id_servico);
    const servicoData = req.body as Servico;
    
    const existedServico = await repository.findOneBy({'id_servico': id});

    if (existedServico === null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." });
        return;
    }

    repository.merge(existedServico, servicoData);
    const savedServico = await repository.save(existedServico);

    res.status(200).json(savedServico);
}

async function deleteServico(req: Request, res: Response) {
  
    const id = Number(req.params.id_servico);
    const result = await repository.delete({"id_servico":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." });
        return;
    }

    res.sendStatus(204); 
}

export default {
    getServico,
    getServicos,
    createServico,
    updateServico,
    deleteServico
}