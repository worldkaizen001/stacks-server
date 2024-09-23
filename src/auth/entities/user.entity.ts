import { MaxLength, MinLength } from 'class-validator';
import { BaseDetails, } from 'src/utils/baseUser';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User extends BaseDetails{

@Column({
    nullable: false,
    unique: true
})
username: string

@Column()
@MaxLength(10, {message: "password should not exceed 10 characters"})
@MinLength(4, {message: "password should not be less than 4 character"})
password: string

@BeforeInsert()
async hashPassword(){
    
 const salt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password,salt);

}

@OneToMany(() => Task, (task) => task.user, {eager: true})
task: Task[]

}
