import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { hash } from 'bcrypt';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @BeforeInsert() 
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}

export default User;