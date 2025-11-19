
import "reflect-metadata"
import { DataSource } from "typeorm" 
import dotenv from "dotenv";
import Pet from './models/pet.model'; 
import Servico from './models/servico.model'; 
import Agendamento from './models/agendamento.model'; 
import User from './models/user.model'; 

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_TYPE as any,
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: String(process.env.DATABASE_NAME),
    synchronize: true,
    entities: [User, Pet, Servico, Agendamento], 
    migrations: ['src/migrations/*.ts']
});