import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from 'src/helpers/hash.helper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const verifyUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (verifyUser) {
      throw new Error('User already exists');
    }

    const createUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        id: uuidv4(),
        password: await hashPassword(createUserDto.password),
      },
    });
    return { id: createUser.id } as any;
  }

  async findAll(): Promise<any> {
    const allUsers = await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
    return allUsers;
  }
}
