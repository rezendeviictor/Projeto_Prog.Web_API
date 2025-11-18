// src/datasource.ts
import "reflect-metadata"
import { DataSource } from "typeorm" // ADICIONE ESTA LINHA
import dotenv from "dotenv";
import Pet from './models/pet.model'; // ADICIONE .js
import Servico from './models/servico.model'; // ADICIONE .js
import Agendamento from './models/agendamento.model'; // ADICIONE .js
import User from './models/user.model'; // ADICIONE .js

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE as any,
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: String(process.env.DATABASE_NAME),
    synchronize: true,
    entities: [User, Pet, Servico, Agendamento], // Esta linha estava correta
    migrations: ['src/migrations/*.ts']
});