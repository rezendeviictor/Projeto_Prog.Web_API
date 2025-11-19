import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Pet from './pet.model';
import Servico from './servico.model';

@Entity("agendamentos")
class Agendamento {
    @PrimaryGeneratedColumn()
    id_agendamento: number;

    @Column()
    id_pet: number;

    @Column()
    id_servico: number;

    @Column()
    data_hora: Date; 

    @Column({ default: 'Agendado' })
    status: string;

    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    atualizadoEm: Date;

    @ManyToOne(() => Pet, (pet) => pet.agendamentos)
    @JoinColumn({ name: "id_pet" }) 
    pet: Pet;

    @ManyToOne(() => Servico, (servico) => servico.agendamentos)
    @JoinColumn({ name: "id_servico" }) 
    servico: Servico;
}

export default Agendamento;