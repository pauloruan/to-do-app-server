import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  done: false;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
