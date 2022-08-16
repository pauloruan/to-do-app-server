import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const verifyUser = await this.prisma.user.findUnique({
        where: {
          id: createTaskDto.userId,
        },
      });

      if (!verifyUser) {
        throw new HttpException(
          MessagesHelper.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      const createTask = await this.prisma.task.create({
        data: {
          ...createTaskDto,
        },
      });
      return createTask;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.TASK_NOT_CREATED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany();
      return tasks;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.TASKS_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const verifyUser = await this.prisma.user.findUnique({
        where: {
          id: updateTaskDto.userId,
        },
      });

      if (!verifyUser) {
        throw new HttpException(
          MessagesHelper.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      const taskUpdated = await this.prisma.task.update({
        where: {
          id,
        },
        data: {
          ...updateTaskDto,
        },
      });
      return taskUpdated;
    } catch (error) {
      throw new HttpException(
        MessagesHelper.TASK_NOT_UPDATED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<any> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return { message: 'Tarefa excluída' };
  }
}
