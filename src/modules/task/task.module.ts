import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [TaskService],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
