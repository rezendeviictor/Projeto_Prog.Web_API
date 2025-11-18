import { Request, Response } from "express";
import Servico from "../models/servico.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Servico);

async function getServico(req: Request, res: Response) {
    /* #swagger.tags = ['Servicos']
       #swagger.description = 'Endpoint para obter um serviço específico pelo ID.'
       #swagger.parameters['id_servico'] = { in: 'path', description: 'ID do Serviço', required: true, type: 'integer' }
       #swagger.responses[200] = {
            description: 'Serviço encontrado com sucesso.',
            schema: { $ref: '#/definitions/ServicoResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Serviço não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_servico);
    const servico = await repository.findOneBy({"id_servico": id});

    if (servico == null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." }); // [cite: 201]
        return;
    }

    res.status(200).json(servico);
}

async function getServicos(req: Request, res: Response) {
    /* #swagger.tags = ['Servicos']
       #swagger.description = 'Endpoint para obter todos os serviços.'
       #swagger.responses[200] = {
            description: 'Lista de serviços encontrada com sucesso.',
            schema: [{ $ref: '#/definitions/ServicoResponseSchema' }]
       }
       #swagger.security = [{"JWT": []}]
    */
    const servicos = await repository.find();
    res.status(200).json(servicos);
}

async function createServico(req: Request, res: Response) {
    /* #swagger.tags = ['Servicos']
       #swagger.description = 'Endpoint para criar um novo serviço.'
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Serviço',
         required: true,
         schema: { $ref: '#/definitions/ServicoSchema' }
       }
       #swagger.responses[201] = {
         description: 'Serviço criado com sucesso.',
         schema: { $ref: '#/definitions/ServicoResponseSchema' }
       }
       #swagger.security = [{"JWT": []}]
    */
    const servicoData = req.body as Servico;
    const servico = repository.create(servicoData);
    const savedServico = await repository.save(servico);

    res.status(201).json(savedServico);
}

async function updateServico(req: Request, res: Response) {
    /* #swagger.tags = ['Servicos']
       #swagger.description = 'Endpoint para atualizar um serviço existente.'
       #swagger.parameters['id_servico'] = { in: 'path', description: 'ID do Serviço', required: true, type: 'integer' }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Serviço para atualizar',
         required: true,
         schema: { $ref: '#/definitions/ServicoSchema' }
       }
       #swagger.responses[200] = {
         description: 'Serviço atualizado com sucesso.',
         schema: { $ref: '#/definitions/ServicoResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Serviço não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_servico);
    const servicoData = req.body as Servico;
    
    const existedServico = await repository.findOneBy({'id_servico': id});

    if (existedServico === null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." }); // [cite: 201]
        return;
    }

    repository.merge(existedServico, servicoData);
    const savedServico = await repository.save(existedServico);

    res.status(200).json(savedServico);
}

async function deleteServico(req: Request, res: Response) {
    /* #swagger.tags = ['Servicos']
       #swagger.description = 'Endpoint para excluir um serviço.'
       #swagger.parameters['id_servico'] = { in: 'path', description: 'ID do Serviço', required: true }
       #swagger.responses[204] = { description: 'Serviço excluído com sucesso.' }
       #swagger.responses[404] = { description: 'Serviço não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_servico);
    const result = await repository.delete({"id_servico":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Serviço não encontrado." }); // [cite: 201]
        return;
    }

    res.sendStatus(204); // [cite: 254]
}

export default {
    getServico,
    getServicos,
    createServico,
    updateServico,
    deleteServico
}