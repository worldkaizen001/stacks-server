import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormConfig';
// import { JwtStrategy } from './auth/jwt-strategy';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
