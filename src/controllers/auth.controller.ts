import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.model"; // Adicionado .js
import { compare } from "bcrypt";
import { AppDataSource } from "../datasource"; // Adicionado .js
dotenv.config();

async function login(req: Request, res: Response) {
    /* #swagger.tags = ['Auth']
       #swagger.description = 'Endpoint to authenticate a user and receive a JWT token.'
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'User credentials for login.',
            required: true,
            schema: { $ref: '#/definitions/LoginSchema' }
       }
       #swagger.responses[200] = {
            description: 'Authentication successful, JWT token returned.',
            schema: { $ref: '#/definitions/LoginResponseSuccessSchema' }
       }
       #swagger.responses[401] = {
            description: 'Authentication failed. Invalid credentials or missing fields.',
            schema: { $ref: '#/definitions/LoginResponseUnauthorizedSchema' }
       }
    */
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({error: "Usuário e/ou senha inválidos ou não informados."})
        return;
    }

    const repository = AppDataSource.getRepository(User);
    const user = await repository.findOneBy({"username": username});

    if (user == null) {
        res.status(401).json({error: "Usuário e/ou senha inválidos ou não informados."})
        return;
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
        res.status(401).json({error: "Usuário e/ou senha inválidos ou não informados."})
        return;
    }

    const token = jwt.sign(
        { "username": username },
        String(process.env.JWT_SECRET),
        { expiresIn: "1h"}
    );

    res.status(200).json(
        {message: "Login realizado com sucesso!", 
            token: token});
}

export default {
    login
}