import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const verifyUser = await this.prisma.user.findUnique({
      where: {
        id: createTaskDto.userId,
      },
    });

    if (!verifyUser) {
      throw new Error('User not found');
    }

    const createTask = await this.prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
    return createTask;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskUpdated = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
    return taskUpdated;
  }
}
