import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/hash.helper';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    const userId = user.id;
    return { token, userId };
  }
}
