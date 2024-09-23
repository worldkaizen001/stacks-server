import { User } from 'src/auth/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'stacktodo',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'kellyakacj',
  // synchronize only good for dev enviroment
  synchronize: true,
  entities: [Task, User],
};

export default config;
