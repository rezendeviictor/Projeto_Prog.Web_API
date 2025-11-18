import { Request, Response } from "express";
import Pet from "../models/pet.model";
import { AppDataSource } from "../datasource";

const repository = AppDataSource.getRepository(Pet);

async function getPet(req: Request, res: Response) {
    /* #swagger.tags = ['Pets']
       #swagger.description = 'Endpoint para obter um pet específico pelo ID.'
       #swagger.parameters['id_pet'] = {
            in: 'path',
            description: 'ID do Pet',
            required: true,
            type: 'integer'
       }
       #swagger.responses[200] = {
            description: 'Pet encontrado com sucesso.',
            schema: { $ref: '#/definitions/PetResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Pet não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_pet); // Parâmetro da rota mudou
    const pet = await repository.findOneBy({"id_pet": id});

    if (pet == null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); // [cite: 104]
        return;
    }

    res.status(200).json(pet);
}

async function getPets(req: Request, res: Response) {
    /* #swagger.tags = ['Pets']
       #swagger.description = 'Endpoint para obter todos os pets.'
       #swagger.parameters['pagina'] = { in: 'query', type: 'integer', description: 'Número da página' }
       #swagger.parameters['limite'] = { in: 'query', type: 'integer', description: 'Itens por página' }
       #swagger.responses[200] = {
            description: 'Lista de pets encontrada com sucesso.',
            schema: [{ $ref: '#/definitions/PetResponseSchema' }]
       }
       #swagger.security = [{"JWT": []}]
    */
    // Lógica de paginação pode ser adicionada aqui usando req.query.pagina e req.query.limite [cite: 49]
    const pets = await repository.find();
    res.status(200).json(pets);
}

async function createPet(req: Request, res: Response) {
    /* #swagger.tags = ['Pets']
       #swagger.description = 'Endpoint para criar um novo pet.'
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Pet',
         required: true,
         schema: { $ref: '#/definitions/PetSchema' }
       }
       #swagger.responses[201] = {
         description: 'Pet criado com sucesso.',
         schema: { $ref: '#/definitions/PetResponseSchema' }
       }
       #swagger.security = [{"JWT": []}]
    */
    const petData = req.body as Pet;
    const pet = repository.create(petData); // Cria a instância
    const savedPet = await repository.save(pet); // Salva no banco

    res.status(201).json(savedPet);
}

async function updatePet(req: Request, res: Response) {
    /* #swagger.tags = ['Pets']
       #swagger.description = 'Endpoint para atualizar um pet existente.'
       #swagger.parameters['id_pet'] = {
            in: 'path',
            description: 'ID do Pet',
            required: true,
            type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Informações do Pet para atualizar',
         required: true,
         schema: { $ref: '#/definitions/PetSchema' }
       }
       #swagger.responses[200] = {
         description: 'Pet atualizado com sucesso.',
         schema: { $ref: '#/definitions/PetResponseSchema' }
       }
       #swagger.responses[404] = { description: 'Pet não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_pet);
    const petData = req.body as Pet;
    
    const existedPet = await repository.findOneBy({'id_pet': id});

    if (existedPet === null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); // [cite: 104]
        return;
    }

    // Atualiza o pet existente com os novos dados
    repository.merge(existedPet, petData);
    const savedPet = await repository.save(existedPet);

    res.status(200).json(savedPet);
}

async function deletePet(req: Request, res: Response) {
    /* #swagger.tags = ['Pets']
       #swagger.description = 'Endpoint para excluir um pet.'
       #swagger.parameters['id_pet'] = { in: 'path', description: 'ID do Pet', required: true }
       #swagger.responses[204] = { description: 'Pet excluído com sucesso.' }
       #swagger.responses[404] = { description: 'Pet não encontrado.' }
       #swagger.security = [{"JWT": []}]
    */
    const id = Number(req.params.id_pet);
    const result = await repository.delete({"id_pet":id})
    
    if (result.affected === 0 || result.affected === null) {
        res.status(404).json({ mensagem: "Pet não encontrado." }); // [cite: 104]
        return;
    }

    res.sendStatus(204); // [cite: 159]
}

export default {
    getPet,
    getPets,
    createPet,
    updatePet,
    deletePet
}