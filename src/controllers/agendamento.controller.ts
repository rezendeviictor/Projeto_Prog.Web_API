import { Request, Response } from "express";
import Agendamento from "../models/agendamento.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Agendamento);

async function getAgendamento(req: Request, res: Response) {
    const id = Number(req.params.id_agendamento);

    const agendamento = await repository.findOne({
        where: { "id_agendamento": id },
        relations: ['pet', 'servico'] 
    });

    if (agendamento == null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); 
        return;
    }

    res.status(200).json(agendamento);
}

async function getAgendamentos(req: Request, res: Response) {

    const agendamentos = await repository.find({ relations: ['pet', 'servico'] });
    res.status(200).json(agendamentos);
}

async function createAgendamento(req: Request, res: Response) {

    const agendamentoData = req.body as Agendamento;

    const agendamento = repository.create(agendamentoData);
    const savedAgendamento = await repository.save(agendamento);

    res.status(201).json(savedAgendamento);
}

async function updateAgendamento(req: Request, res: Response) {

    const id = Number(req.params.id_agendamento);

    const { data_hora, status } = req.body;
    
    const existedAgendamento = await repository.findOneBy({'id_agendamento': id});

    if (existedAgendamento === null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); 
        return;
    }


    if(data_hora) existedAgendamento.data_hora = data_hora;
    if(status) existedAgendamento.status = status;

    const savedAgendamento = await repository.save(existedAgendamento);

    res.status(200).json(savedAgendamento);
}

async function deleteAgendamento(req: Request, res: Response) {

    const id = Number(req.params.id_agendamento);
    const result = await repository.delete({"id_agendamento":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); 
        return;
    }

    res.sendStatus(204); 
}

export default {
    getAgendamento,
    getAgendamentos,
    createAgendamento,
    updateAgendamento,
    deleteAgendamento
}