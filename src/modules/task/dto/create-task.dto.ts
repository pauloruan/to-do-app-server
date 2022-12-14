import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'Nome da tarefa criada pelo usuário.',
    example: 'Respeitar Januário',
  })
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description:
      'Status da tarefa criada pelo usuário. Por padrão, a tarefa está como "não finalizada", logo seu valor inicial é "false".',
    example: false,
  })
  done: false;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'ID do usuário que criou a tarefa. O ID do usuário é obtido ao fazer cadastro no sistema.',
    example: '13',
  })
  userId: number;
}
