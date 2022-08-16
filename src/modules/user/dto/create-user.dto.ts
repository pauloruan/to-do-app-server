import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description:
      'Nome do usuário será exibido na aplicação após o login. O nome deve conter no mínimo 3 letras.',
    example: 'Luiz Gonzaga',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description:
      'E-mail do usuário será requerido no login. Deve possuir um formato válido.',
    example: 'asabranca@email.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(RegexHelper.password, {
    message: MessagesHelper.PASSWORD_OR_EMAIL_INVALID,
  })
  @ApiProperty({
    description:
      'Senha do usuário será requerido no login. Deveposuir letras maiúsculas, minúsculas, números e caracteres especiais',
    example: 'asa-Branca123',
  })
  password: string;
}
