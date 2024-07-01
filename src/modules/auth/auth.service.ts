import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      console.log('password: ', password);
      return result;
    }
    return null;
  }

  async findUser(username: string): Promise<any> {
    // 这里模拟查找用户，你可以用数据库替换这个逻辑
    const users = [
      {
        userId: 1,
        username: 'test',
        password: await bcrypt.hash('password', 10),
      },
    ];
    return users.find((user) => user.username === username);
  }
}
