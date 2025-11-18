import Agendamento from "../../models/agendamento.model";
import { Response, Request } from "express";

// Mock do repositório
const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(), // Usamos findOne por causa das 'relations'
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn()
}

// Mock do DataSource
jest.mock('../../datasource', () => ({
    AppDataSource: {
            getRepository: jest.fn(() => mockRepository)
        }
}));

import agendamentoController from "../../controllers/agendamento.controller";

// Helper para criar mocks de Request e Response
const mockRequestResponse = (reqOverrides: Partial<Request> = {}) => {
    const req: Partial<Request> = {
        params: {},
        body: {},
        ...reqOverrides
    }
    const res: Partial<Response> = {
        status: jest.fn(() => res as Response),
        json: jest.fn(),
        sendStatus: jest.fn()
    }
    return { req: req as Request, res: res as Response};
};

describe('Agendamento Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAgendamentos', () => {
        it('deveria retornar a lista de agendamentos', async() => {
            const mockAgendamentos: Partial<Agendamento>[] = [
                {id_agendamento: 1, id_pet: 1, id_servico: 1, status: 'Agendado'}, 
            ];
            mockRepository.find.mockResolvedValue(mockAgendamentos);
            
            const {req, res} = mockRequestResponse();
            await agendamentoController.getAgendamentos(req, res);

            expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['pet', 'servico'] });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAgendamentos);
        });
    });

    describe('getAgendamento', () => {
        it('deveria retornar um agendamento específico', async () => {
            const mockAgendamento: Partial<Agendamento> = {id_agendamento: 1, id_pet: 1, id_servico: 1};
            mockRepository.findOne.mockResolvedValue(mockAgendamento);

            const { req, res } = mockRequestResponse({ params: { id_agendamento: '1' } });
            await agendamentoController.getAgendamento(req, res);

            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { "id_agendamento": 1 },
                relations: ['pet', 'servico']
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAgendamento);
        });

        it('deveria retornar 404 se o agendamento não existe', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { id_agendamento: '99' } });
            await agendamentoController.getAgendamento(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Agendamento não encontrado." });
        });
    });

    describe('createAgendamento', () => {
        it('deveria criar um novo agendamento', async () => {
            const newAgendamento = { id_pet: 1, id_servico: 1, data_hora: new Date() };
            const savedAgendamento = { id_agendamento: 1, ...newAgendamento, status: 'Agendado' };
            
            mockRepository.create.mockReturnValue(newAgendamento as Agendamento);
            mockRepository.save.mockResolvedValue(savedAgendamento);

            const { req, res } = mockRequestResponse({ body: newAgendamento });
            await agendamentoController.createAgendamento(req, res);

            expect(mockRepository.create).toHaveBeenCalledWith(newAgendamento);
            expect(mockRepository.save).toHaveBeenCalledWith(newAgendamento);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedAgendamento);
        });
    });
    
    describe('updateAgendamento', () => {
        it('deveria atualizar um agendamento existente', async () => {
            const updatedData = { status: 'Confirmado' };
            const existingAgendamento = { id_agendamento: 1, id_pet: 1, status: 'Agendado' };
            
            mockRepository.findOneBy.mockResolvedValue(existingAgendamento);
            
            // O controller atualiza o objeto 'existingAgendamento'
            const updatedAgendamento = { ...existingAgendamento, ...updatedData };
            mockRepository.save.mockResolvedValue(updatedAgendamento);

            const { req, res } = mockRequestResponse({ params: { id_agendamento: '1' }, body: updatedData });
            await agendamentoController.updateAgendamento(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ "id_agendamento": 1 });
            expect(mockRepository.save).toHaveBeenCalledWith(updatedAgendamento); // Verifica se o save foi chamado com o objeto modificado
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedAgendamento);
        });
    });

    describe('deleteAgendamento', () => {
        it('deveria deletar um agendamento', async() => {
            mockRepository.delete.mockResolvedValue({affected: 1});
            
            const {req, res} = mockRequestResponse({params: {id_agendamento: '1'}});
            await agendamentoController.deleteAgendamento(req, res);

            expect(mockRepository.delete).toHaveBeenCalledWith({"id_agendamento": 1});
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        it('deveria retornar 404 se o agendamento não existe (delete)', async() => {
            mockRepository.delete.mockResolvedValue({affected: 0});
            
            const {req, res} = mockRequestResponse({params: {id_agendamento: '99'}});
            await agendamentoController.deleteAgendamento(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Agendamento não encontrado." });
        });
    });
});