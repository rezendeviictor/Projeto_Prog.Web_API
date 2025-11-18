import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Agendamento from './agendamento.model';

@Entity("servicos")
class Servico {
    @PrimaryGeneratedColumn()
    id_servico: number;

    @Column()
    nome: string; // Baseado no corpo do POST da documentação [cite: 205]

    @Column({ nullable: true })
    descricao: string; // Baseado no corpo do POST da documentação [cite: 205]

    @Column("decimal", { precision: 10, scale: 2 })
    preco: number;

    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    atualizadoEm: Date;

    @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
    agendamentos: Agendamento[];
}

export default Servico;