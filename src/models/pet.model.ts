import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Agendamento from './agendamento.model';

@Entity("pets") 
class Pet {
    @PrimaryGeneratedColumn()
    id_pet: number;

    @Column()
    nome: string;

    @Column()
    tutor: string;

    @Column()
    CPF_tutor: string;

    @Column()
    tipo: string;

    @Column({ nullable: true })
    raca: string;

    @Column({ nullable: true })
    dt_nascimento: string;

    @Column({ nullable: true })
    rua: string;

    @Column({ nullable: true })
    numero: string;

    @Column({ nullable: true })
    bairro: string;

    @Column({ nullable: true })
    cidade: string;

    @Column({ nullable: true })
    estado: string;

    @Column({ nullable: true })
    CEP: string;
    
    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    atualizadoEm: Date;

    @OneToMany(() => Agendamento, (agendamento) => agendamento.pet)
    agendamentos: Agendamento[];


}

export default Pet;