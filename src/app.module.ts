import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'ormConfig';
// import { JwtStrategy } from './auth/jwt-strategy';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './task/entities/task.entity';
import { log } from 'console';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      // validationSchema: configValidationSchema,
    }),
    TaskModule,
    AuthModule,
    // TypeOrmModule.forRoot(config),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {

//         const host = configService.get<string>('DB_HOST');
//       const  port = configService.get<number>('DB_PORT');
//        const username =configService.get<string>('DB_USERNAME');
//          const  password = configService.get<string>('DB_PASSWORD');
//          const database =configService.get<string>('DB_DATABASE');
//          console.log({host, port, password, username, database});

// DB_DATABASE=stack_pg_8cc3
// DB_HOST=dpg-crojvpaj1k6c739is36g-a
// DB_PORT=5432
// DB_USERNAME=stack_pg_8cc3_user
// DB_PASSWORD=aHwcbcm9y87MdUR2kjWaqnrJwdmEULnq
const connectionString = "postgresql://stack_pg_8cc3_user:aHwcbcm9y87MdUR2kjWaqnrJwdmEULnq@dpg-crojvpaj1k6c739is36g-a.oregon-postgres.render.com/stack_pg_8cc3";

// const conectionOption: TypeOrmModuleOptions = {
//   type: 'postgres',
//   url: connectionString,
//   entities: [Task, User],
//     synchronize: true,
//     ssl: {
//       rejectUnauthorized: false,   // Disable SSL if needed
//     },


// }
console.log({enviorment: process.env.NODE_ENV});

// return conectionOption;
return ({
  type: 'postgres',
  host: "oregon-postgres.render.com",
  port: 5432,
  username: "stack_pg_8cc3_user",
  password: "aHwcbcm9y87MdUR2kjWaqnrJwdmEULnq",
  database: "stack_pg_8cc3",

  entities: [Task, User],

  synchronize: true,
  ssl: {
          rejectUnauthorized: false,   // Disable SSL if needed
        },
})
 
         
  
        // return ({
        //   type: 'postgres',
        //   host: configService.get<string>('DB_HOST'),
        //   port: configService.get<number>('DB_PORT'),
        //   username: configService.get<string>('DB_USERNAME'),
        //   password: configService.get<string>('DB_PASSWORD'),
        //   database: configService.get<string>('DB_DATABASE'),
  
        //   entities: [Task, User],
  
        //   // synchronize: true,
        // })
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
