import { Request, Response } from "express";
import Agendamento from "../models/agendamento.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Agendamento);

async function getAgendamento(req: Request, res: Response) {
    /* #swagger.tags = ['Agendamentos']
       #swagger.description = 'Endpoint para obter um agendamento específico pelo ID.'
       #swagger.parameters['id_agendamento'] = { in: 'path', description: 'ID do Agendamento', required: true, type: 'integer' }
       #swagger.responses[200] = {
            description: 'Agendamento encontrado com sucesso.',
            schema: { $ref: '#/definitions/AgendamentoResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Agendamento não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_agendamento);
    // Usar 'relations' para trazer dados do pet e serviço juntos
    const agendamento = await repository.findOne({
        where: { "id_agendamento": id },
        relations: ['pet', 'servico'] 
    });

    if (agendamento == null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); // [cite: 298]
        return;
    }

    res.status(200).json(agendamento);
}

async function getAgendamentos(req: Request, res: Response) {
    /* #swagger.tags = ['Agendamentos']
       #swagger.description = 'Endpoint para obter todos os agendamentos.'
       #swagger.responses[200] = {
            description: 'Lista de agendamentos encontrada com sucesso.',
            schema: [{ $ref: '#/definitions/AgendamentoResponseSchema' }]
       }
       #swagger.security = [{"JWT": []}]
    */
    const agendamentos = await repository.find({ relations: ['pet', 'servico'] });
    res.status(200).json(agendamentos);
}

async function createAgendamento(req: Request, res: Response) {
    /* #swagger.tags = ['Agendamentos']
       #swagger.description = 'Endpoint para criar um novo agendamento.'
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Agendamento',
         required: true,
         schema: { $ref: '#/definitions/AgendamentoSchema' }
       }
       #swagger.responses[201] = {
         description: 'Agendamento criado com sucesso.',
         schema: { $ref: '#/definitions/AgendamentoResponseSchema' }
       }
       #swagger.security = [{"JWT": []}]
    */
    const agendamentoData = req.body as Agendamento;
    // Opcional: Validar se id_pet e id_servico existem antes de criar
    const agendamento = repository.create(agendamentoData);
    const savedAgendamento = await repository.save(agendamento);

    res.status(201).json(savedAgendamento);
}

async function updateAgendamento(req: Request, res: Response) {
    /* #swagger.tags = ['Agendamentos']
       #swagger.description = 'Endpoint para atualizar um agendamento existente.'
       #swagger.parameters['id_agendamento'] = { in: 'path', description: 'ID do Agendamento', required: true, type: 'integer' }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Agendamento para atualizar',
         required: true,
         schema: { $ref: '#/definitions/AgendamentoUpdateSchema' }
       }
       #swagger.responses[200] = {
         description: 'Agendamento atualizado com sucesso.',
         schema: { $ref: '#/definitions/AgendamentoResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Agendamento não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_agendamento);
    // No PUT, só podemos atualizar 'data_hora' e 'status' [cite: 334, 335]
    const { data_hora, status } = req.body;
    
    const existedAgendamento = await repository.findOneBy({'id_agendamento': id});

    if (existedAgendamento === null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); // [cite: 298]
        return;
    }

    // Atualiza apenas os campos permitidos
    if(data_hora) existedAgendamento.data_hora = data_hora;
    if(status) existedAgendamento.status = status;

    const savedAgendamento = await repository.save(existedAgendamento);

    res.status(200).json(savedAgendamento);
}

async function deleteAgendamento(req: Request, res: Response) {
    /* #swagger.tags = ['Agendamentos']
       #swagger.description = 'Endpoint para excluir um agendamento.'
       #swagger.parameters['id_agendamento'] = { in: 'path', description: 'ID do Agendamento', required: true }
       #swagger.responses[204] = { description: 'Agendamento excluído com sucesso.' }
       #swagger.responses[404] = { description: 'Agendamento não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_agendamento);
    const result = await repository.delete({"id_agendamento":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Agendamento não encontrado." }); // [cite: 298]
        return;
    }

    res.sendStatus(204); // [cite: 354]
}

export default {
    getAgendamento,
    getAgendamentos,
    createAgendamento,
    updateAgendamento,
    deleteAgendamento
}