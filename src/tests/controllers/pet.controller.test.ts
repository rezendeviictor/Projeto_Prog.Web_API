import Pet from "../../models/pet.model";
import { Response, Request } from "express";

const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn()
}

jest.mock('../../datasource', () => ({
    AppDataSource: {
            getRepository: jest.fn(() => mockRepository)
        }
}));

import petController from "../../controllers/pet.controller";

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

describe('Pet Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPets', () => {
        it('deveria retornar a lista de pets', async() => {
            const mockPets: Partial<Pet>[] = [
                {id_pet: 1, nome: "Rex", tipo: "Cachorro"}, 
                {id_pet: 2, nome: "Miau", tipo: "Gato"}
            ];
            mockRepository.find.mockResolvedValue(mockPets);
            const {req, res} = mockRequestResponse();
            await petController.getPets(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPets);
        });
    });

    describe('deletePet', () => {
        it('deveria deletar um pet', async() => {
            mockRepository.delete.mockResolvedValue({affected: 1});
            const {req, res} = mockRequestResponse({params: {id_pet: '1'}});
            await petController.deletePet(req, res);

            expect(mockRepository.delete).toHaveBeenCalledWith({"id_pet": 1});
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        it('deveria retornar 404 se o pet nao existe (delete)', async() => {
            mockRepository.delete.mockResolvedValue({affected: 0});
            const {req, res} = mockRequestResponse({params: {id_pet: '99'}});
            await petController.deletePet(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ mensagem: "Pet não encontrado." });
        });
    });


});