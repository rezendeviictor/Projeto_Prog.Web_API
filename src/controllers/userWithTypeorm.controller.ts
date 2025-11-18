import { Request, Response } from "express";
import User from "../models/user.model"; // Adicionado .js
import { AppDataSource } from "../datasource"; // Adicionado .js

const repository = AppDataSource.getRepository(User);

async function getUserByUsername(req: Request, res: Response) {
    /* #swagger.tags = ['User']
       #swagger.description = 'Endpoint to get a specific user by username.'
       #swagger.parameters['username'] = {
            in: 'path',
            description: 'Username',
            required: true,
            type: 'string'
       }
       #swagger.responses[200] = {
            description: 'User found successfully.',
            schema: { $ref: '#/definitions/UserResponseSchema' }
       }
       #swagger.responses[404] = { description: 'User not found.' }
       #swagger.security = [{"JWT": []}]
    */
    const username = String(req.params.username);
    const user = await repository.findOneBy({"username": username});

    if (user == null){
        res.sendStatus(404);
        return;
    }

    res.status(200).json(user);
}

async function getUsers(req: Request, res: Response) {
    /* #swagger.tags = ['User']
       #swagger.description = 'Endpoint to get all users.'
       #swagger.responses[200] = {
            description: 'List of users found successfully.',
            schema: [{ $ref: '#/definitions/UserResponseSchema' }]
       }
       #swagger.security = [{"JWT": []}]
    */
    const users = await repository.find();

    res.status(200).json(users);
}

async function createUser(req: Request, res: Response) {
    /* #swagger.tags = ['User']
       #swagger.description = 'Endpoint to create a new user.'
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'User credentials',
         required: true,
         schema: { $ref: '#/definitions/UserSchema' }
       }
       #swagger.responses[201] = {
         description: 'User created successfully.',
         schema: { $ref: '#/definitions/UserResponseSchema' }
       }
    */
    const data = req.body;
    const user = repository.create(data);
    const savedUser = await repository.save(user);

    res.status(201).json(savedUser);
}

export default {
    getUserByUsername,
    getUsers,
    createUser
}