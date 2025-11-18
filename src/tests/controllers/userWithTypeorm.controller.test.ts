import User from "../../models/pet.model";
import { Response, Request } from "express";


const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
}

jest.mock('../../datasource', () => ({
    AppDataSource: {
            getRepository: jest.fn(() => mockRepository)
        }
}));

import userWithTypeormController from "../../controllers/userWithTypeorm.controller";

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

describe('User With TypeORM Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => {
            const mockUsers: User[] = [
                new User("user1", "pass1"),
                new User("user2", "pass2")
            ];
            mockRepository.find.mockResolvedValue(mockUsers);

            const { req, res } = mockRequestResponse();
            await userWithTypeormController.getUsers(req, res);

            expect(mockRepository.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe('getUserByUsername', () => {
        it('should return a user when found', async () => {
            const mockUser = new User("testuser", "password");
            mockRepository.findOneBy.mockResolvedValue(mockUser);

            const { req, res } = mockRequestResponse({ params: { username: 'testuser' } });
            await userWithTypeormController.getUserByUsername(req, res);

            expect(mockRepository.findOneBy).toHaveBeenCalledWith({ "username": "testuser" });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 when user is not found', async () => {
            mockRepository.findOneBy.mockResolvedValue(null);

            const { req, res } = mockRequestResponse({ params: { username: 'nonexistent' } });
            await userWithTypeormController.getUserByUsername(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
    });

    describe('createUser', () => {
        it('should create and return a new user', async () => {
            const newUser = { username: 'newuser', password: 'newpassword' };
            const savedUser = { id: 1, ...newUser };
            mockRepository.create.mockReturnValue(newUser as User);
            mockRepository.save.mockResolvedValue(savedUser);

            const { req, res } = mockRequestResponse({ body: newUser });
            await userWithTypeormController.createUser(req, res);

            expect(mockRepository.create).toHaveBeenCalledWith(newUser);
            expect(mockRepository.save).toHaveBeenCalledWith(newUser);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedUser);
        });
    });
});
