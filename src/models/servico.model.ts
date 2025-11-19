import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Agendamento from './agendamento.model';

@Entity("servicos")
class Servico {
    @PrimaryGeneratedColumn()
    id_servico: number;

    @Column()
    nome: string; 

    @Column({ nullable: true })
    descricao: string; 

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