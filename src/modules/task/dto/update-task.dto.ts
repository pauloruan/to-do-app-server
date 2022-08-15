import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Task } from '../entities/task.entity';

export class UpdateTaskDto extends Task {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
