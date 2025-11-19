import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.model"; 
import { compare } from "bcrypt";
import { AppDataSource } from "../datasource"; 
dotenv.config();

async function login(req: Request, res: Response) {

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