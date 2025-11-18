import Servico from "../../models/servico.model";
import { Response, Request } from "express";

// Mock do repositório
const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn()
}

// Mock do DataSource para injetar o repositório mockado
jest.mock('../../datasource', () => ({
    AppDataSource: {
            getRepository: jest.fn(() => mockRepository)
        }
}));

import servicoController from "../../controllers/servico.controller";

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

describe('Servico Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getServicos', () => {
        it('deveria retornar a lista de serviços', async() => {
            const mockServicos: Partial<Servico>[] = [
                {id_servico: 1, nome: "Banho", preco: 80}, 
                {id_servico: 2, nome: "Tosa", preco: 100}
            ];
            mockRepository.find.mockResolvedValue(mockServicos);
            
            const {req, res} = mockRequestResponse();
            await servicoController.getServicos(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockServicos);
        });
    });

    describe('getServico', () => {
        it('deveria retornar um serviço específico', async () => {
            const mockServico: Partial<Servico> = {id_servico: 1, nome: "Banho", preco: 80};
            mockRepository.findOneBy.mockResolvedValue(mockServico);

            const { req, res } = mockRequestResponse({ params: { id_servico: '1' } });
            await servicoController.getServico(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ "id_servico": 1 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockServico);
        });

        it('deveria retornar 404 se o serviço não existe', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { id_servico: '99' } });
            await servicoController.getServico(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Serviço não encontrado." });
        });
    });

    describe('createServico', () => {
        it('deveria criar um novo serviço', async () => {
            const newServico = { nome: 'Banho', preco: 80 };
            const savedServico = { id_servico: 1, ...newServico };
            
            mockRepository.create.mockReturnValue(newServico as Servico);
            mockRepository.save.mockResolvedValue(savedServico);

            const { req, res } = mockRequestResponse({ body: newServico });
            await servicoController.createServico(req, res);

            expect(mockRepository.create).toHaveBeenCalledWith(newServico);
            expect(mockRepository.save).toHaveBeenCalledWith(newServico);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedServico);
        });
    });
    
    describe('updateServico', () => {
        it('deveria atualizar um serviço existente', async () => {
            const updatedData = { nome: 'Banho Premium', preco: 90 };
            const existingServico = { id_servico: 1, nome: 'Banho', preco: 80 };
            const updatedServico = { ...existingServico, ...updatedData };
            
            mockRepository.findOneBy.mockResolvedValue(existingServico);
            mockRepository.save.mockResolvedValue(updatedServico);

            const { req, res } = mockRequestResponse({ params: { id_servico: '1' }, body: updatedData });
            await servicoController.updateServico(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ "id_servico": 1 });
            expect(mockRepository.merge).toHaveBeenCalledWith(existingServico, updatedData);
            expect(mockRepository.save).toHaveBeenCalledWith(existingServico);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedServico);
        });

        it('deveria retornar 404 ao tentar atualizar um serviço que não existe', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { id_servico: '99' }, body: { nome: 'Inexistente' } });
            await servicoController.updateServico(req, res);

            expect(mockRepository.save).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Serviço não encontrado." });
        });
    });


    describe('deleteServico', () => {
        it('deveria deletar um serviço', async() => {
            mockRepository.delete.mockResolvedValue({affected: 1});
            
            const {req, res} = mockRequestResponse({params: {id_servico: '1'}});
            await servicoController.deleteServico(req, res);

            expect(mockRepository.delete).toHaveBeenCalledWith({"id_servico": 1});
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        it('deveria retornar 404 se o serviço não existe (delete)', async() => {
            mockRepository.delete.mockResolvedValue({affected: 0});
            
            const {req, res} = mockRequestResponse({params: {id_servico: '99'}});
            await servicoController.deleteServico(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Serviço não encontrado." });
        });
    });
});