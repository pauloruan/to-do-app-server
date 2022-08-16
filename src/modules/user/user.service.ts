import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/helpers/hash.helper';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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
          id: uuidv4(),
          password: await hashPassword(createUserDto.password),
        },
      });

      return { id: createUser.id } as any;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.USER_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, email: true },
      });
      return users;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.USERS_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
