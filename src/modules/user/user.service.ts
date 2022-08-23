import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/helpers/hash.helper';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const verifyUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (verifyUser) {
        throw new HttpException(
          MessagesHelper.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }

      const createUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await hashPassword(createUserDto.password),
        },
      });
      return { userId: createUser.id } as any;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.USER_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = this.prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
