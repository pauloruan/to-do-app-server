import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, UserModule, TaskModule],
})
export class AppModule {}
