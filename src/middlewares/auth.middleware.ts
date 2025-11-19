import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../datasource";
import { compare } from "bcrypt";
import User from "../models/user.model";

dotenv.config();

async function basicAuthMiddleware(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
    res.status(401).json({error: "Autenticação necessária."});
    return;
   }

   const [authType, authValue] = authHeader.split(' ');

   if (authType !== "Basic" || !authValue ) {
    res.status(401).json({error: "Autenticação necessária."});
    return;
   }

   const authCredential = Buffer.from(authValue, 'base64').toString('utf-8');
   
   const [authUser, authPass] = authCredential.split(':');

   const repository = AppDataSource.getRepository(User);
   
   const user = await repository.findOneBy({"username": String(authUser)});

   if (user == null) {
    res.status(401).json({error: "Usuário/senha inválida."});
    return;
   } 

   const isValid = await compare(String(authPass), user.password);

   if (!isValid) {
    res.status(401).json({error: "Usuário/senha inválida."});
    return;
   } 

   next();
}

function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({error: "Autenticação necessária."});
        return;
    }

    const [authType, authValue] = authHeader.split(' ');

    if (authType !== "Bearer" || !authValue) {
        res.status(401).json({error: "Autenticação necessária."});
        return;
    }

    try {
        jwt.verify(authValue, String(process.env.JWT_SECRET));
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({error: "Token expirado."});
        } else {
            res.status(401).json({error: "Token inválido."});
        }

        return;
    }

    next();
}

export default {
    jwtAuthMiddleware,
    basicAuthMiddleware
}