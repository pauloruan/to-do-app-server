import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
