import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly txRepo: Repository<Task>,
    private configService: ConfigService,
  ) {}
  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, reward, status } = createTaskDto;
    const newTask = this.txRepo.create({ title, reward, status, user });
    this.txRepo.save(newTask);

    if (newTask) {
      return { message: 'Task Created' };
    }
    {
      throw new InternalServerErrorException();
    }
  }

  async getAllTask(user: User): Promise<any> {
    const query = this.txRepo.createQueryBuilder('task');
    query.where({ user });
    console.log(this.configService.get('DB_PORT'));
    console.log(this.configService.get('DB_HOST'));

    

    // if (status) {
    //  query.andWhere('task.status = :status', { status: status })
    // }

    // if (search) {
    //   query.andWhere(
    //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
    //     { search: `%${search}%` },
    //   );
    // }

    const tasks = await query.getMany();
    return tasks;
  }

  async getOneTask(id: string, user: User): Promise<any> {
    // const task = this.txRepo.find({ where: { id, user } });
    const quary = this.txRepo.createQueryBuilder('task');

    const task = quary.where({ id, user }).getOne();
    // if (!task) {
    //   throw new NotFoundException('Not found o.');
    // }
    return task;
  }
  // async getOneTask(id: string, user: User): Promise<any> {
  //   const query = this.txRepo.createQueryBuilder('task');
  //   query.where({id, user});
  //   // const task = this.txRepo.findOne({
  //   //   where: { id , user},
  //   // });
  //   // if (!task) {
  //   //   throw new NotFoundException();
  //   // }
  //   try {
  //     const task = await query.getOne();
  //     console.log(task);
  //     if (task === null) {
  //       throw new NotFoundException('Not found task');
  //     }
  //     return task;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Server Error Error');
  //   }
  // }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<any> {
    const task = this.getOneTask(id, user);

    if (!task) {
      throw new NotFoundException('Not Found');
    } else {
      this.txRepo.update(id, updateTaskDto);
      return {
        message: 'Task updated successfully',
      };
    }
  }

  async remove(id: string, user: User) {
    const task = await this.getOneTask(id, user);
    if (!task) {
      throw new NotFoundException({ message: 'Not Found' });
    }

    const isDelete = await this.txRepo.delete(id);
    if (isDelete['affected'] === 1) {
      return 'Task deleted Successfully';
    }
  }
}
