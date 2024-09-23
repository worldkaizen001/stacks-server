import { Exclude } from "class-transformer";
import { User } from "src/auth/entities/user.entity";
import { BaseDetails } from "src/utils/baseUser";
import { TaskStatus } from "src/utils/taskStatus";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task extends BaseDetails {
  
    @Column()
    title : string

    @Column()
    reward: string

    @Column()
    status: TaskStatus.Open

    @ManyToOne(() => User, (user) => user.task, { eager: false })
    @Exclude({toPlainOnly: true})
    user: User;
    
}
