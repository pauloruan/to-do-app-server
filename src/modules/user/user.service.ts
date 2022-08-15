import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
        ...createUserDto,
      },
    });
    return { id: createUser.id } as any;
  }
}
