import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.username,
      req.body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.generateToken(user);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
