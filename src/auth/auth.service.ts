import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const newUser = this.authRepo.create(createUserDto);

    try {
      await this.authRepo.save(newUser);
      return {
        message: 'user created',
      };
    } catch (error) {
      console.log(error);

      throw new NotFoundException('Error Creating User');
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;

    const user = await this.authRepo.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('Kindly check credentials');
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {

      throw new NotFoundException('Kindly check credentials');
    } else {

      const payload: JwtPayload = { username };
      // console.log(payload);

      const accessToken = await this.jwtService.sign(payload);
      // console.log(accessToken);

      return {
        accessToken,
      };
    }
  }

  // async signIn(createUserDto: CreateUserDto): Promise<{accessToken : string}> {
  //   const { username, password } = createUserDto;
    
  //   const user = await this.authRepo.findOne({
  //     where: { username: username },
  //   });
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     // return 'success';
  //    const payload : JwtPayload = {username}
  //    const accessToken = this.jwtService.sign(payload)

  //    return {accessToken}
  //   } else {
  //     throw new UnauthorizedException('Check Login credentials');
  //   }
  // }
}
